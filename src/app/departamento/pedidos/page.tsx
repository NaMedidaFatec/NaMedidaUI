"use client";

import React, { useEffect, useState } from "react";
import { withFormik } from "formik";
import UserValidation from "../../../validations/login";
import { User } from "../../../model/user";
import UserService from "../../../services/user";
import { Button } from "../../../components/general";
import { useUpdateTitle } from "../../../hooks/useTitle";
import { Grid, keys, Box } from "@mantine/core";
import { IconFileInfo, IconPlus } from "@tabler/icons-react";
import ClearableInput from "../../../components/general/ClearableInput";
import DataTable from "../../../components/general/DataTable";
import ModalDetalhePedido from "../../../components/Modals/ModalDetalhePedido";
import { useDisclosure } from "@mantine/hooks";
import ModalCadastroPedido from "../../../components/Modals/ModalCadastroPedido";

// function filterData(data, search: string) {
//   const query = search.toLowerCase().trim();
//   return data.filter((item) =>
//     keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
//   );
// }

// function sortData(
//   data,
//   payload: { sortBy: []; reversed: boolean; search: string }
// ) {
//   const { sortBy } = payload;

//   if (!sortBy) {
//     return filterData(data, payload.search);
//   }

//   return filterData(
//     [...data].sort((a, b) => {
//       if (payload.reversed) {
//         return b[sortBy].localeCompare(a[sortBy]);
//       }

//       return a[sortBy].localeCompare(b[sortBy]);
//     }),
//     payload.search
//   );
// }

function PedidoRetorno(props: any) {
  const updateTitle = useUpdateTitle();

  useEffect(() => {
    updateTitle('Pedidos Pendentes')
  }, [])

  const [openedDetalhe, handlers] = useDisclosure(false);
  const [openedCadastro, { open, close }] = useDisclosure(false);


  const tableHeaders = ["Código", "Solicitante" ,"Data do pedido", "Situação", "Observação"];

  const elements = [
    { id: 1, escola: 'ESCOLA 1', data: '2024-01-01', situacao: 'ENTREGUE', obs: '' },
    { id: 2, escola: 'ESCOLA 2', data: '2024-01-01', situacao: 'ENTREGUE', obs: 'TESTE' },
    { id: 3, escola: 'ESCOLA 3', data: '2024-01-01', situacao: 'ENTREGUE', obs: '' },
    { id: 4, escola: 'ESCOLA 4', data: '2024-01-01', situacao: 'ENTREGUE', obs: '' },
  ];

  const additionalButtons = [
    { id: 1, icon: <IconFileInfo/>, onClick: () => handlers?.open() },
  ];

  return (
    <>
      <ModalDetalhePedido open={openedDetalhe} close={() => handlers?.close()} />

      <Box
        w='100%'
        h="89vh"
        display='flex'
        style={{ flexDirection: 'column' }}>

        <Box h='auto' mt='1rem'>
            <ClearableInput placeholder="Pesquisar" label="Pesquisar" />
        </Box>

        <DataTable headerElements={tableHeaders} elements={elements} additionalButtons={additionalButtons} />

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
