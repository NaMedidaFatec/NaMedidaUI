"use client";

import React, { useEffect, useState } from "react";
import { withFormik } from "formik";
import UserValidation from "../../../validations/login";
import { User } from "../../../model/user";
import UserService from "../../../services/user";
import { Button } from "../../../components/general";
import { useUpdateTitle } from "../../../hooks/useTitle";
import { Grid, keys, Box, GridCol, Text } from "@mantine/core";
import { IconFileInfo, IconPlus } from "@tabler/icons-react";
import ClearableInput from "../../../components/general/ClearableInput";
import DataTable from "../../../components/general/DataTable";
import ModalDetalhePedido from "../../../components/Modals/ModalDetalhePedido";
import { useDisclosure } from "@mantine/hooks";
import ModalCadastroPedido from "../../../components/Modals/ModalCadastroPedido";
import { notifications } from "@mantine/notifications";
import RequisicaoService from "../../../services/general/requisicao";
import classes from "./pedidos.module.css";
import cx from "clsx";

function PedidoRetorno(props: any) {
  const updateTitle = useUpdateTitle();
  const [pedido, setPedido] = useState({});
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    updateTitle("Pedidos Pendente");
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const pedidos = await RequisicaoService.fetchAll();
      const pedidosList = pedidos?.content?.map((requisicao) => ({
        //  ...requisicao,
        id: requisicao?.id,
        unidadeEnsino: requisicao?.unidadeEnsino?.nome,
        data: requisicao?.data,
        enabled: requisicao?.enabled ? "Em aberto" : "Finalizado",
        observacoes: requisicao?.observacoes,
        solicitante: requisicao?.solicitante?.nome,
        observacoesCancelamento: requisicao?.observacoesCancelamento,
      }));
      setPedidos(pedidosList);
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

  const [openedDetalhe, handlers] = useDisclosure(false);
  const [openedCadastro, { open, close }] = useDisclosure(false);
  const tableHeaders = [
    "Código",
    "Solicitante",
    "Data do pedido",
    "Situação",
    "Observação",
    "Responsável pela Solicitação",
    "Observações cancelamento",
  ];

  const additionalButtons = [
    { id: 1, icon: (
      <Grid className={cx(classes.icon)}>
        <IconFileInfo  className={cx(classes.txtDetails)}/>
        <Text className={cx(classes.txtDetails)}>Detalhes</Text>
      </Grid>)
      , onClick: pedido => {
        handlers?.open()
        setPedido(pedido)
      } },

    { id: 1, icon: (
      <Grid className={cx(classes.icon)}>
      <IconFileInfo className={cx(classes.txtCancel)}/>
      <Text className={cx(classes.txtCancel)}>Cancelar</Text>
    </Grid>)
    , onClick: () => handlers?.open() },
  ];  

  return (
    <>
      <ModalDetalhePedido
        pedido={pedido}
        open={openedDetalhe}
        close={() => handlers?.close()}
      />

      <Box w="100%" h="89vh" display="flex" style={{ flexDirection: "column" }}>
        <Box h="auto" mt="1rem">
          <ClearableInput placeholder="Pesquisar" label="Pesquisar" />
        </Box>
        <DataTable
          headerElements={tableHeaders}
          elements={pedidos}
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
