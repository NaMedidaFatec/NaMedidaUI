import {
  Box,
  Button,
  Divider,
  Grid,
  Input,
  Modal,
  NumberInput,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { IconChevronDown, IconFilePencil, IconTrash } from "@tabler/icons-react";
import UserService from "../../../services/user";
import { notifications } from "@mantine/notifications";
import { useAuth } from "../../../hooks/useAuth";
import DataTable from "../../general/DataTable";
import RequisicaoSeparacaoItemService from "../../../services/general/requisicaoseparacaoitem";
import LoteService from "../../../services/departamento/estoque/lotes";

interface ComponentProps {
  open?: boolean;
  pedidoItem?: any;
  close?: () => void;
  fetchItens?: () => void;
  onPedidoItem?: (pedido: any) => void;
  fetchPedidoItem?: () => void;
}

export default function ModalSeparacaoItemPedido({
  open,
  close,
  pedidoItem,
  fetchItens,
  onPedidoItem,
}: ComponentProps) {
  const { user } = useAuth();
  const tableHeaders = [
    "Cód",
    "Qtd",
    "Lote",
    "Dt. Vencimento",
    "Dt. Fabricação",
  ];

  const originalFormData = {
    estoque: undefined,
    quantidadeEntregue: undefined,
    requisicaoItem: pedidoItem?.id,
  };

  const [isEdicao, setIsEdicao] = useState(false);
  const [lotes, setLotes] = useState([]);
  const [lotesList, setLotesList] = useState([]);
  const [lote, setLote] = useState({});
  const [formData, setFormData] = useState(originalFormData);
  const [separacaoItens, setSeparacaoItens] = useState([]);
  const [separacaoItensList, setSeparacaoItensList] = useState([]);

  const additionalButtons = [
    {
        id: 1,
        icon: <IconFilePencil />,
        onClick: (element: any) => {
          const separacaoItem = separacaoItens.find((i) => i?.id === element?.id);
          setIsEdicao(true)
          setLote(lotes.find((element) => element?.id === separacaoItem?.estoque?.id));
          setFormData({
            ...separacaoItem,
            estoque: separacaoItem?.estoque?.id,
            quantidadeAprovada: separacaoItem.quantidadeEntregue,
            requisicaoItem: {
              id: pedidoItem?.id,
              quantidade: pedidoItem.quantidade,
              quantidadePendente: pedidoItem.quantidadePendente,
              quantidadeEntregue: pedidoItem.quantidadeEntregue,
              estoque: separacaoItem?.estoque?.id,
            },
          })
        }
    },
    {
      id: 2,
      icon: <IconTrash color="red" />,
      onClick: async (element: any) => handleDeleteSeparacao(element),
    },
  ];

  const handleDeleteSeparacao = async (element) => {
    try {
      const pedidoSeparacaoItem =  await RequisicaoSeparacaoItemService.deleteRequisicaoSeparacaoItem(element?.id)
      const pedidoItem = pedidoSeparacaoItem?.content?.requisicaoItem;
      await fetchItens();
      await fetchSeparacaoItens(pedidoItem);
      fetchLotes(pedidoItem?.produto?.id);
      onPedidoItem(pedidoItem)

      setIsEdicao(false);
      setFormData({
        estoque: "",
        quantidadeEntregue: pedidoItem?.quantidadePendente,
        requisicaoItem: pedidoItem?.id,
      })
      
      notifications.show({
        title: "Item excluído com sucesso",
        message: "",
        position: "bottom-left",
        color: "blue",
      });
    } catch (error) {
      notifications.show({
        title: "Erro ao remover o separação!",
        message: error?.message,
        position: "bottom-left",
        color: "red",
      });
    } finally {
    
    }
  }

  useEffect(() => {
    if (pedidoItem?.id) {
      fetchSeparacaoItens(pedidoItem);
      fetchLotes(pedidoItem?.produto?.id);
    }
  }, [open]);

  useEffect(() => {
    if (isEdicao) {
      prepararEdicao();
    } else {
      setFormData(originalFormData);
    }
    setFormData((prevState) => ({
      ...prevState,
      requisicaoItem: pedidoItem?.id,
    }));
  }, [open]);

  const fetchSeparacaoItens = async ({ id }) => {
    try {
      const separacaoItens = await RequisicaoSeparacaoItemService.fetchAllByRequisicaoItem(id);
      const separacaoItensList = separacaoItens?.content?.map((requisicaoseparacaoitem) => ({
        id: requisicaoseparacaoitem?.id,
        quantidadeEntregue: requisicaoseparacaoitem?.quantidadeEntregue,
        estoque: requisicaoseparacaoitem?.estoque?.nome,
        dataValidade: requisicaoseparacaoitem?.estoque?.dataValidade,
        dataFabricacao: requisicaoseparacaoitem?.estoque?.dataFabricacao,
      }));

      await setSeparacaoItens(separacaoItens?.content);
      await setSeparacaoItensList(separacaoItensList);
    } catch (error) {
      console.log(error?.message);
      notifications.show({
        title: "Erro ao buscar as separações do item!",
        message: error?.message,
        position: "bottom-left",
        color: "red",
      });
    }
  };

  const fetchLotes = async (id) => {
    try {
      const lotes = await LoteService.fetchAllByProdutoWithEstoqueLivre(id);
      const lotesList = lotes?.content?.map((lote) => ({
        id: lote?.id,
        quantidade: lote?.quantidade,
        estoque: lote?.nome,
        dataValidade: lote?.dataValidade,
        dataFabricacao: lote?.dataFabricacao,
      }));

      setLotes(lotes?.content);
      setLotesList(lotesList);
    } catch (error) {
      console.log(error?.message);
      notifications.show({
        title: "Erro ao buscar os lotes do produto!",
        message: error?.message,
        position: "bottom-left",
        color: "red",
      });
    }
  };

  const prepararEdicao = () => {
    setFormData((prevState) => ({
      ...prevState,
      requisicaoItem: pedidoItem?.id,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e?.target;

    if (name.startsWith("telefoneForm") || name.startsWith("enderecoForm")) {
      const [section, field] = name.split(".");
      console.log(section, field);

      setFormData((prevState) => ({
        ...prevState,
        [section]: {
          ...prevState[section],
          [field]: field === "cidade" ? Number(value) : value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const saveSeparacaoItem = async () => {
    try {
      const pedidoSeparacao = isEdicao ? await RequisicaoSeparacaoItemService.saveRequisicaoSeparacaoItem(formData?.id, {
        ...formData,
        estoque: { id: formData?.estoque, quantidade: lote?.quantidade }
      }) : await RequisicaoSeparacaoItemService.createRequisicaoSeparacaoItem(formData);

      const pedidoItem = isEdicao ? pedidoSeparacao?.content?.requisicaoItem : pedidoSeparacao?.data.requisicaoItem;
      await fetchItens();
      await fetchSeparacaoItens(pedidoItem);
      fetchLotes(pedidoItem?.produto?.id);
      onPedidoItem(pedidoItem)
      setIsEdicao(false);
      setFormData({
        estoque: "",
        quantidadeEntregue: pedidoItem?.quantidadePendente,
        requisicaoItem: pedidoItem?.id,
      })

      notifications.show({
        title: "Salvo com sucesso",
        message: "",
        position: "bottom-left",
        color: "blue",
      });
    } catch (error) {
      console.log(error.message);
      notifications.show({
        title: "Erro ao salvar",
        message: error?.message,
        position: "bottom-left",
        color: "red",
      });
    }
  };

  return (
    <>
      <Modal
        opened={open}
        onClose={close}
        centered
        size="60vw"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        title={
          <Text size="xl" fw={200}>
            Separação de Estoque
          </Text>
        }
      >
        <Divider size="xs" />
        <Grid mt="md">
          <Grid.Col span={12}>
            <Box display={"flex"}>
              <Text size="1.1rem" fw={700} mt={"1.5rem"} mr={".5rem"}>
                Item:
              </Text>
              <Text size="1.1rem" fw={200} mt={"1.5rem"}>
                {pedidoItem?.requisicao?.id} - {pedidoItem?.produto?.nome}, {pedidoItem?.produto?.descricao}
              </Text>
            </Box>
          </Grid.Col>
          <Grid.Col span={12}>
            <Box display={"flex"}>
              <Text size="1.1rem" fw={200} mt={"1.5rem"}>
                Quantidade Separada: {pedidoItem?.quantidadeEntregue} - Quantidade Pendente: {pedidoItem?.quantidadePendente}
              </Text>
            </Box>
          </Grid.Col>
          <Grid.Col span={12}>
            <Divider size="xs" />
          </Grid.Col>

          <Grid.Col span={12}>
            <Input.Wrapper label={"Produto"} required>
              <Input
                disabled
                component="select"
                name="separadoPor"
                onChange={e => {
                    handleChange(e)
                }}
                rightSection={<IconChevronDown size={14} stroke={1.5} />}
                pointer
              >
                {[pedidoItem?.produto].map((user) => (
                  <option key={user?.id} value={Number(user?.id)}>
                    {user?.nome} - {user?.descricao}
                  </option>
                ))}
              </Input>
            </Input.Wrapper>
          </Grid.Col>

          <Grid.Col span={12}>
            <Input.Wrapper label={"Lote"} required>
              <Input
                component="select"
                name="estoque"
                value={formData?.estoque}
                onChange={e => {
                    const {  value } = e?.target;
                    setLote(lotes.find((element) => element?.id === value));
                    handleChange(e)
                }}
                rightSection={<IconChevronDown size={14} stroke={1.5} />}
                pointer
              >
                <option
                    defaultValue=""
                    selected
                >
                    Selecione o lote
                </option>
                {lotes.map((lote) => (
                  <option key={lote?.id} value={Number(lote?.id)}>
                    {lote?.id} - {lote?.nome}:  Quantidade disponível: {lote.quantidade}
                  </option>
                ))}
              </Input>
            </Input.Wrapper>
          </Grid.Col>

          <Grid.Col span={12}>
            <NumberInput
              // max={pedidoItem?.quantidadePendente}
              name="quantidadeEntregue"
              onChange={(quantidadeEntregue) =>
                setFormData({
                  ...formData,
                  quantidadeEntregue: Number(quantidadeEntregue),
                })
              }
              value={formData.quantidadeEntregue}
              label="Quantidade"
              required
            />
          </Grid.Col>
        </Grid>

        <Button
          mt="md"
          fullWidth
          variant="gradient"
          fs="22rem"
          onClick={saveSeparacaoItem}
        >
          {isEdicao ? 'EDITAR' : 'ADICIONAR'}
        </Button>

        <Divider size="xs" my="md" />

        <Text size="xl" fw={200}>
          Itens
        </Text>

        <DataTable
          headerElements={tableHeaders}
          elements={separacaoItensList}
          additionalButtons={additionalButtons}
        />
      </Modal>
    </>
  );
}