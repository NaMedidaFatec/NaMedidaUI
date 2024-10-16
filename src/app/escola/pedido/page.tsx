"use client";

import React, { useEffect, useState } from "react";
import { withFormik } from "formik";
import UserValidation from "../../../validations/login";
import { User } from "../../../model/user";
import UserService from "../../../services/user";
import { Button } from "../../../components/general";
import { useUpdateTitle } from "../../../hooks/useTitle";
import { Grid, keys, Box } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import ClearableInput from "../../../components/general/ClearableInput";
import DataTable from "../../../components/general/DataTable";

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

function Pedido(props: any) {
  const updateTitle = useUpdateTitle();

  useEffect(() => {
      updateTitle('Meus Pedidos')
  }, [])

  const tableHeaders = ["Código", "Data do pedido", "Situação", "Observação"];

  const elements = [
      { id: 1, data: '2024-01-01', situacao: 'ENTREGUE', obs: '' },
      { id: 2, data: '2024-01-01', situacao: 'ENTREGUE', obs: 'TESTE' },
      { id: 3, data: '2024-01-01', situacao: 'ENTREGUE', obs: '' },
      { id: 4, data: '2024-01-01', situacao: 'ENTREGUE', obs: '' },
  ];

  const additionalButtons = [
      { id: 1, icon: "DETALHES", onClick: () => 1 },
  ];

  return (
    <>
      <Box
        w='100%'
        h="89vh"
        display='flex'
        style={{ flexDirection: 'column' }}>

        <Grid h='auto' mt='1rem'>
          <Grid.Col span={6}>
            <ClearableInput placeholder="Pesquisar" label="Pesquisar" />
          </Grid.Col>
          <Grid.Col span={3} offset={3} display='flex' style={{ justifyContent: 'flex-end' }}>
            <Button h='4rem' w='4rem' style={{ borderRadius: '10rem' }}>
              <IconPlus size={23} />
            </Button>
          </Grid.Col>
        </Grid>

        <DataTable headerElements={tableHeaders} elements={elements} additionalButtons={additionalButtons} detalhePedido/>

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
})(Pedido);
