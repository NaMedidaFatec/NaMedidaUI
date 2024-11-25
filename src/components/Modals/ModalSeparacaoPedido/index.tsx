import {
  Button,
  Divider,
  Grid,
  Input,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { IconChevronDown, IconFileInfo } from "@tabler/icons-react";
import UserService from "../../../services/user";
import { notifications } from "@mantine/notifications";
import { useAuth } from "../../../hooks/useAuth";
import DateInput from "../../general/DateInput";
import RequisicaoItemService from "../../../services/general/requisicaoitem";
import DataTable from "../../general/DataTable";
import classes from "./separacaopedido.module.css";
import cx from "clsx";
import { useDisclosure } from "@mantine/hooks";
import ModalSeparacaoItemPedido from "../ModalSeparacaoItemPedido";
import RequisicaoSeparacaoService from "../../../services/general/requisicaoseparacao";

interface ComponentProps {
  open?: boolean;
  pedido?: any;
  pedidoSeparacao: any;
  close?: () => void;
  fetchPedidos?: () => void;
  fetchSeparacao?: () => void;
  isEdicao?: boolean;
  editSeparacao?: {
    id?: number;
    requisicao?: number;
    data?: string;
    observacoes?: string;
    ativo?: boolean;
    finalizada?: boolean;
  };
}

export default function ModalSeparacaoPedido({
  open,
  close,
  isEdicao,
  pedido,
  pedidoSeparacao,
  fetchSeparacao,
  fetchPedidos,
}: ComponentProps) {
  const { user } = useAuth();
  const tableHeaders = [
    "Código",
    "Produto",
    "Qtd. Entregue",
    "Qtd. Pendente",
  ];

  const [itens, setItens] = useState([]);
  const [itensList, setItensList] = useState([]);

  const originalFormData = {
    id: undefined,
    data: new Date().toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
    observacoes: "",
    separadoPor: user?.id,
    requisicao: pedido?.id,
  };

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(originalFormData);
  const [pedidoItem, setPedidoItem] = useState({});
  const [openedItems, handlersItems] = useDisclosure(false);

  const additionalButtons = [
    {
      id: 1,
      icon: (
        <Grid className={cx(classes.icon)}>
          <IconFileInfo className={cx(classes.txtSeparacao)} />
          <Text className={cx(classes.txtSeparacao)}>Itens</Text>
        </Grid>
      ),
      onClick: (element: any) => openItensModal(element?.id),
    },
  ];

  const openItensModal = (clickedItemId: string) => {
    setPedidoItem(itens.find((element) => element?.id === clickedItemId));
    handlersItems?.open();
    close();
  };

  const fetchPedidoItem = async (clickedItemId: string) => {
    const item = itens.find((element) => element?.id === clickedItemId)
    await setPedidoItem(item);
    return item;
  }

  useEffect(() => {
    if (pedido?.id) {
      fetchItens(pedido);
    }
  }, [pedido]);

  useEffect(() => {
    if (isEdicao) {
      prepararEdicao();
    } else {
      setFormData(originalFormData);
    }
    fetchUsersDepartamento();
    if (pedido?.id) {
      fetchItens(pedido);
    }
  }, [open]);

  const prepararEdicao = () => {
    setFormData((prevState) => ({
      ...prevState,
      id: pedidoSeparacao?.id,
      data: pedidoSeparacao?.data,
      observacoes: pedidoSeparacao?.observacoes,
      separadoPor: undefined,
      requisicao: {
        id: pedido.id,
      },
      separadoPor: {
        id: pedidoSeparacao?.separadoPor?.id,
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e?.target;

    if (name.startsWith("telefoneForm") || name.startsWith("enderecoForm")) {
      const [section, field] = name.split(".");

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

  const fetchItens = async ({ id }) => {
    try {
      const itens = await RequisicaoItemService.fetchAllByRequisicao(id);
      const itensList = itens?.content?.map((requisicaoitem) => ({
        id: requisicaoitem?.id,
        produto: requisicaoitem?.produto?.nome,
        quantidadeEntregue: requisicaoitem?.quantidadeEntregue,
        quantidadePendente: requisicaoitem?.quantidadePendente,
      }));

      await setItens(itens?.content);
      await setItensList(itensList);
    } catch (error) {
      notifications.show({
        title: "Erro ao buscar os itens!",
        message: error?.message,
        position: "bottom-left",
        color: "red",
      });
    }
  };

  const savePedidoSeparacao = async () => {
    try {
      if (isEdicao) {
        await RequisicaoSeparacaoService.updateSeparacao(formData?.id, formData)
      } else {
        await RequisicaoSeparacaoService.createSeparacao(formData)
      }
      
      notifications.show({
        title: "Salvo com sucesso",
        message: "",
        position: "bottom-left",
        color: "blue",
      });
      setTimeout(async () => {
        await close();
        await fetchPedidos();
        fetchSeparacao();
      }, 750);
    } catch (error) {
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
      <ModalSeparacaoItemPedido
        fetchItens={() => fetchItens(pedido)}
        pedidoItem={pedidoItem}
        fetchPedidoItem={() => fetchPedidoItem(pedidoItem?.id)}
        onPedidoItem={(pedidoItem) => {
          setPedidoItem(pedidoItem)
        }}
        open={openedItems}
        close={() => handlersItems?.close()}
      />

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
            Separação de suprimentos
          </Text>
        }
      >
        <Divider size="xs" />
        <Grid mt="md">
          <Grid.Col span={6}>
            <TextInput
              name="requisicao"
              value={isEdicao ? formData.requisicao?.id : formData?.requisicao}
              onChange={handleChange}
              label="Nro. Pedido"
              required
              disabled
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <DateInput
              setValue={(data) => setFormData({ ...formData, data })}
              value={formData.data}
              name="data"
              label="Data"
              required
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              name="observacoesPe"
              value={pedido.observacoes}
              onChange={handleChange}
              label="Observações do Pedido"
              required
              multiple
              disabled
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              label="Observações da Separação"
              required
              multiple
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Input.Wrapper label={"Separado Por"} required>
              <Input
                disabled
                component="select"
                name="separadoPor"
                value={formData?.separadoPor}
                onChange={handleChange}
                rightSection={<IconChevronDown size={14} stroke={1.5} />}
                pointer
              >
                {users.map((user) => (
                  <option key={user?.id} value={Number(user?.id)}>
                    {user?.nome}
                  </option>
                ))}
              </Input>
            </Input.Wrapper>
          </Grid.Col>
        </Grid>
        <Button
          mt="md"
          fullWidth
          variant="gradient"
          fs="22rem"
          onClick={savePedidoSeparacao}
        >
          SALVAR
        </Button>
        {formData?.id && (
          <>
            <Divider size="xs" my="md" />
            <Text size="xl" fw={200}>
              Itens
            </Text>

            <DataTable
              headerElements={tableHeaders}
              elements={itensList}
              additionalButtons={additionalButtons}
            />
          </>
        )}
      </Modal>
    </>
  );
}
