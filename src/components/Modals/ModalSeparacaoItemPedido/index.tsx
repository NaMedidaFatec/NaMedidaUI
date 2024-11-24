import {
  Box,
  Button,
  Divider,
  Grid,
  Input,
  Modal,
  NumberInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { TimeInput } from "@mantine/dates";
import { IconChevronDown, IconFileInfo } from "@tabler/icons-react";
import UserService from "../../../services/user";
import EscolaService from "../../../services/escola";
import { notifications } from "@mantine/notifications";
import { useAuth } from "../../../hooks/useAuth";
import DateInput from "../../general/DateInput";
import RequisicaoItemService from "../../../services/general/requisicaoitem";
import DataTable from "../../general/DataTable";
import classes from "./separacaoitempedido.module.css";
import cx from "clsx";
import RequisicaoSeparacaoItemService from "../../../services/general/requisicaoseparacaoitem";
import LoteService from "../../../services/departamento/estoque/lotes";

interface ComponentProps {
  open?: boolean;
  pedidoItem?: any;
  close?: () => void;
  fetchItens?: () => void;
  isEdicao?: boolean;
  editSeparacaoItem?: {
    id?: number;
    requisicao?: number;
    data?: string;
    observacoes?: string;
    ativo?: boolean;
    finalizada?: boolean;
  };
}

export default function ModalSeparacaoItemPedido({
  open,
  close,
  isEdicao,
  pedidoItem,
  editSeparacaoItem,
  fetchItens,
}: ComponentProps) {
  const { user } = useAuth();
  const tableHeaders = [
    "Código",
    "Quantidade",
    "Lote",
    "Data de Vencimento",
    "Data de Fabricação",
  ];

  const [itens, setItens] = useState([]);

  const originalFormData = {
    lote: undefined,
  };

  const [users, setUsers] = useState([]);
  const [lotes, setLotes] = useState([]);
  const [lotesList, setLotesList] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [produto, setProduto] = useState({});
  const [lote, setLote] = useState({});

  const [formData, setFormData] = useState(originalFormData);

  const [separacaoItens, setSeparacaoItens] = useState([]);
  const [separacaoItensList, setSeparacaoItensList] = useState([]);

  const additionalButtons = [
    {
      id: 1,
      icon: (
        <Grid className={cx(classes.icon)}>
          <IconFileInfo className={cx(classes.txtSeparacao)} />
          <Text className={cx(classes.txtSeparacao)}>Itens</Text>
        </Grid>
      ),
      onClick: (element: any) => openDetalhesModal(element?.id),
    },
  ];

  const openDetalhesModal = (clickedItemId: string) => {
    // setPedido(pedidos.find((element) => element?.id === clickedItemId));
    // handlersDetalhes?.open()
  };

  const openSeparacaoModal = (clickedItemId: string) => {
    // setPedido(pedidos.find((element) => element?.id === clickedItemId));
    // handlersSeparacao?.open()
  };

  useEffect(() => {
    // if (isEdicao) {
    //   prepararEdicao();
    // } else {
    //   setFormData(originalFormData);
    // }
    // fetchUsersDepartamento();
    if (pedidoItem?.id) {
      fetchSeparacaoItens(pedidoItem);
      fetchLotes(pedidoItem);
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
      // data: new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      // requisicao: pedidoitem?.id,
      // departamento: user?.departamento ? user?.departamento?.id : undefined,
      // separadoPor: user?.id,
    }));
    fetchUsersDepartamento();
  }, [open]);


  const fetchSeparacaoItens = async ({ id }) => {
    try {
      const separacaoItens = await RequisicaoSeparacaoItemService.fetchAllByRequisicaoItem(id);
      const separacaoItensList = separacaoItens?.content?.map((requisicaoseparacaoitem) => ({
        id: requisicaoseparacaoitem?.id,
        quantidadeEntregue: requisicaoseparacaoitem?.quantidadeEntregue,
        lote: requisicaoseparacaoitem?.estoque?.nome,
        dataValidade: requisicaoseparacaoitem?.estoque?.dataValidade,
        dataFabricacao: requisicaoseparacaoitem?.estoque?.dataFabricacao,
      }));

      setSeparacaoItens(separacaoItens?.content);
      setSeparacaoItensList(separacaoItensList);
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


  const fetchLotes = async ({ id }) => {
    try {
      const lotes = await LoteService.fetchAllByProduto(id);
      const lotesList = lotes?.content?.map((lote) => ({
        id: lote?.id,
        quantidade: lote?.quantidade,
        lote: lote?.nome,
        dataValidade: lote?.dataValidade,
        dataFabricacao: lote?.dataFabricacao,
      }));

      setLotes(lotes?.content);
      setLotesList(lotesList);
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


  const prepararEdicao = () => {
    setFormData((prevState) => ({
      ...prevState,
      requisicao: pedidoitem?.id,
      separadoPor: user?.id,
      // data: new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      // nome: isEdicao ? editSeparacaoItem?.nome : '',
      // razaoSocial: isEdicao ? editSeparacaoItem?.razaoSocial : '',
      // cnpj: isEdicao ? editSeparacaoItem?.cnpj : '',
      // email: isEdicao ? editSeparacaoItem?.email : '',
      // tipoPessoa: isEdicao ? editSeparacaoItem?.tipoPessoa : 'PJ',
      // horarioAbertura: isEdicao ? editSeparacaoItem?.horarioAbertura?.substring(0, 5) : '06:00',
      // horarioFechamento: isEdicao ? editSeparacaoItem?.horarioFechamento?.substring(0, 5) : '18:00',
      // nivelEnsino: isEdicao ? editSeparacaoItem?.nivelEnsino : '',
      // telefoneForm: {
      //     numero: isEdicao ? editSeparacaoItem?.numero : '',
      //     ddd: isEdicao ? editSeparacaoItem?.ddd : ''
      // },
      // enderecoForm: {
      //     numero: isEdicao ? editSeparacaoItem?.endNumero : '',
      //     logradouro: isEdicao ? editSeparacaoItem?.logradouro : '',
      //     complemento: isEdicao ? editSeparacaoItem?.endComplemento : '',
      //     bairro: isEdicao ? editSeparacaoItem?.bairro : '',
      //     cep: isEdicao ? editSeparacaoItem?.cep : '',
      //     cidade: isEdicao ? editSeparacaoItem?.cidade : undefined
      // },
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

  const fetchUsersDepartamento = async () => {
    const users = await UserService.fetchAllUsersDepartamento();
    setUsers(
      users?.content?.map((user) => ({
        id: user.id,
        nome: user.nome,
      }))
    );
  };

  // const fetchItens = async ({ id }) => {
  //     try {
  //         const itens = await RequisicaoItemService.fetchAllByRequisicao(id);
  //         const itensList = itens?.content?.map((requisicaoitem) => ({
  //             id: requisicaoitem?.id,
  //             produto: requisicaoitem?.produto?.nome,
  //             quantidadeEntregue: requisicaoitem?.quantidadeEntregue,
  //             quantidadePendente: requisicaoitem?.quantidadePendente,
  //         }));

  //         setItens(itensList);
  //     } catch (error) {
  //         console.log(error?.message);
  //         notifications.show({
  //         title: "Erro ao buscar os itens!",
  //         message: error?.message,
  //         position: "bottom-left",
  //         color: "red",
  //         });
  //     }
  //     };

  const saveSeparacaoItem = async () => {
    try {
      if (isEdicao) {
        await RequisicaoSeparacaoItemService.saveRequisicaoSeparacaoItem(formData?.id, formData);
      } else {
        await RequisicaoSeparacaoItemService.createRequisicaoSeparacaoItem(formData);
      }
      notifications.show({
        title: "Salvo com sucesso",
        message: "",
        position: "bottom-left",
        color: "blue",
      });
      setTimeout(() => {
        fetchItens();
      }, 750);
      close();
    } catch (error) {
      console.log(error);
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
                name="separadoPor"
                value={formData?.lote}
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
                    disabled
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
              max={pedidoItem?.quantidadePendente}
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
          ADICIONAR
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
