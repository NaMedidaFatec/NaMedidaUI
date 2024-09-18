"use client";

import React, { useEffect, useState } from "react";
import { withFormik } from "formik";
import UserValidation from "../../../validations/login";
import { User } from "../../../model/user";
import UserService from "../../../services/user";
import { Button, Paper } from "../../../components/general";
import { useUpdateTitle } from "../../../hooks/useTitle";
import ToolBar from "../../../components/toolbar";
import {
  Grid,
  Table,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  Input,
  Modal,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons-react";
import classes from "./pedido.module.css";
import CadastroPedido from "./_components/CadastroPedido";

function Th({ children, reversed, sorted, onSort }) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data, search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data,
  payload: { sortBy: []; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

const data = [
  {
    name: "Athena Weissnat",
    company: "Little - Rippin",
    email: "Elouise.Prohaska@yahoo.com",
  },
  {
    name: "Deangelo Runolfsson",
    company: "Greenfelder - Krajcik",
    email: "Kadin_Trantow87@yahoo.com",
  },
  {
    name: "Danny Carter",
    company: "Kohler and Sons",
    email: "Marina3@hotmail.com",
  },
  {
    name: "Trace Tremblay PhD",
    company: "Crona, Aufderhar and Senger",
    email: "Antonina.Pouros@yahoo.com",
  },
  {
    name: "Derek Dibbert",
    company: "Gottlieb LLC",
    email: "Abagail29@hotmail.com",
  },
  {
    name: "Viola Bernhard",
    company: "Funk, Rohan and Kreiger",
    email: "Jamie23@hotmail.com",
  },
  {
    name: "Austin Jacobi",
    company: "Botsford - Corwin",
    email: "Genesis42@yahoo.com",
  },
  {
    name: "Hershel Mosciski",
    company: "Okuneva, Farrell and Kilback",
    email: "Idella.Stehr28@yahoo.com",
  },
  {
    name: "Mylene Ebert",
    company: "Kirlin and Sons",
    email: "Hildegard17@hotmail.com",
  },
  {
    name: "Lou Trantow",
    company: "Parisian - Lemke",
    email: "Hillard.Barrows1@hotmail.com",
  },
  {
    name: "Dariana Weimann",
    company: "Schowalter - Donnelly",
    email: "Colleen80@gmail.com",
  },
  {
    name: "Dr. Christy Herman",
    company: "VonRueden - Labadie",
    email: "Lilyan98@gmail.com",
  },
  {
    name: "Katelin Schuster",
    company: "Jacobson - Smitham",
    email: "Erich_Brekke76@gmail.com",
  },
  {
    name: "Melyna Macejkovic",
    company: "Schuster LLC",
    email: "Kylee4@yahoo.com",
  },
  {
    name: "Pinkie Rice",
    company: "Wolf, Trantow and Zulauf",
    email: "Fiona.Kutch@hotmail.com",
  },
  {
    name: "Brain Kreiger",
    company: "Lueilwitz Group",
    email: "Rico98@hotmail.com",
  },
];

function Pedido(props: any) {
  const updateTitle = useUpdateTitle();



  const [dialogCadastroOpen, setDialogCadastroOpen] = useState(false);
  const [pedido, setPedido] = useState({});




  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [opened, setOpened] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    updateTitle("Pedidos");
  }, []);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.company}</Table.Td>
    </Table.Tr>
  ));

  const onClose = () => {
    setDialogCadastroOpen(false);
  }

  const onSave = () => {
    setDialogCadastroOpen(false);
  }

  return (
    <>
      <CadastroPedido
        opened={dialogCadastroOpen}
        value={pedido}
        onClose={onClose}
        onSave={onSave}
      />

      <ToolBar>
        <Grid align="center">
          <Grid.Col span={6} display="flex">
            <Button
              fullWidth
              size="md"
              type="submit"
              onClick={() => setDialogCadastroOpen(true)}
            >
              NOVO CADASTRO
            </Button>
          </Grid.Col>
        </Grid>
      </ToolBar>

      <Paper>
        <TextInput
          placeholder="Search by any field"
          mb="md"
          leftSection={
            <IconSearch
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          value={search}
          onChange={handleSearchChange}
        />
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          miw={700}
          layout="fixed"
        >
          <Table.Tbody>
            <Table.Tr>
              <Th
                sorted={sortBy === "name"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("name")}
              >
                Name
              </Th>
              <Th
                sorted={sortBy === "email"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("email")}
              >
                Email
              </Th>
              <Th
                sorted={sortBy === "company"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("company")}
              >
                Company
              </Th>
            </Table.Tr>
          </Table.Tbody>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={Object.keys(data[0]).length}>
                  <Text fw={500} ta="center">
                    Nothing found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Paper>
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
