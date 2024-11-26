"use client";

import React, { useEffect, useState } from "react";
import { withFormik } from "formik";
import UserValidation from "../../../validations/login";
import { User } from "../../../model/user";
import UserService from "../../../services/user";
import { useUpdateTitle } from "../../../hooks/useTitle";
import { Grid, Box, Text } from "@mantine/core";
import { IconFileInfo } from "@tabler/icons-react";
import ClearableInput from "../../../components/general/ClearableInput";
import DataTable from "../../../components/general/DataTable";
import ModalDetalhePedido from "../../../components/Modals/ModalDetalhePedido";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import RequisicaoService from "../../../services/general/requisicao";
import classes from "./pedidos.module.css";
import cx from "clsx";
import ModalSeparacaoPedido from "../../../components/Modals/ModalSeparacaoPedido";
import RequisicaoSeparacaoService from "../../../services/general/requisicaoseparacao";

function PedidoRetorno(props: any) {
  const updateTitle = useUpdateTitle();
  const [pedido, setPedido] = useState({ id: '' });
  const [pedidoSeparacao, setPedidoSeparacao] = useState({});

  const [pedidos, setPedidos] = useState([]);
  const [pedidosList, setPedidosList] = useState([]);
  const [isEdicao, setEdicao] = useState(false);
  const [selectedSeparacao] = useState({});

  useEffect(() => {
    updateTitle("Pedidos Pendente");
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const pedidos = await RequisicaoService.fetchAll();
      const pedidosList = pedidos?.content?.map((requisicao) => ({
        id: requisicao?.id,
        unidadeEnsino: requisicao?.unidadeEnsino?.nome,
        data: requisicao?.data,
        observacoes: requisicao?.observacoes,
        solicitante: requisicao?.solicitante?.nome,
        observacoesCancelamento: requisicao?.observacoesCancelamento,
      }));

      setPedidos(pedidos?.content);
      setPedidosList(pedidosList);
    } catch (error) {
      console.log(error?.message);
      notifications.show({
        title: "Erro ao buscar os pedidos!",
        message: error?.message,
        position: "bottom-left",
        color: "red",
      });
    }
  };

  const [openedDetalhe, handlersDetalhes] = useDisclosure(false);
  const [openedSeparacao, handlersSeparacao] = useDisclosure(false);
  const tableHeaders = [
    "CÓD",
    "SOLICITANTE",
    "DATA DO PEDIDO",
    "OBS.",
    "RESPONSÁVEL PELA SOLICITAÇÃO",
    "OBS. CANCELAMENTO",
  ];

  const additionalButtons = [
    // { id: 1, icon: (
    //   <Grid className={cx(classes.iconDetails)}>
    //     <IconFileInfo  className={cx(classes.txtDetails)}/>
    //     <Text className={cx(classes.txtDetails)}></Text>
    //   </Grid>)
    //   , onClick: (element: any) => openDetalhesModal(element?.id)
    //   },

    { id: 1, icon: (
      <Grid className={cx(classes.icon)}>
      <Text className={cx(classes.txtSeparacao)}> SEPARAR</Text>
    </Grid>)
      , onClick: (element: any) => openSeparacaoModal(element?.id)
     },
  ];  

  const openDetalhesModal = (clickedItemId: string) => {
    setPedido(pedidos.find((element) => element?.id === clickedItemId));
    handlersDetalhes?.open()
  };

  const openSeparacaoModal = async (clickedItemId: string) => {
    const pedido = (pedidos.find((element) => element?.id === clickedItemId));
    setPedido(pedido)
    await fetchPedidoSeparacao(pedido)
    handlersSeparacao?.open()
  };

  const fetchPedidoSeparacao = async ({ id }) => {
      const pedidoSeparacao = await RequisicaoSeparacaoService.fetchSeparacao(id);
      if (pedidoSeparacao?.content) {
        await setEdicao(true)
      }
      await setPedidoSeparacao(pedidoSeparacao?.content);
  };

  return (
    <>
      {/* <ModalDetalhePedido
        pedido={pedido}
        open={openedDetalhe}
        close={() => handlersDetalhes?.close()}
      /> */}

      <ModalSeparacaoPedido
        isEdicao={isEdicao} 
        editSeparacao={selectedSeparacao}
        fetchSeparacao={() => openSeparacaoModal(pedido?.id)}
        fetchPedidos={fetchPedidos}
        pedido={pedido}
        pedidoSeparacao={pedidoSeparacao}
        open={openedSeparacao}
        close={() => handlersSeparacao?.close()}
      />

      <Box w="100%" h="89vh" display="flex" style={{ flexDirection: "column" }}>
        <Box h="auto" mt="1rem">
          <ClearableInput placeholder="Pesquisar" label="Pesquisar" />
        </Box>
        <DataTable
          headerElements={tableHeaders}
          elements={pedidosList}
          additionalButtons={additionalButtons}
        />
      </Box>
    </>
  );
}

export default withFormik({
  validateOnChange: false,
  validateOnBlur: false,
  mapPropsToValues: () => new User(),
  validationSchema: UserValidation,
  handleSubmit: async (values: User, { setStatus }) => {
    const result = await UserService.signin(new User(values));
    if (result) {
      setStatus(true);
    }
  },
})(PedidoRetorno);
