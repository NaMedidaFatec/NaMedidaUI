"use client";

import React, { useEffect, useState } from "react";
import { withFormik } from "formik";
import UserValidation from "../../../../../validations/login";
import { User } from "../../../../../model/user";
import UserService from "../../../../../services/user";
import { Button, Paper } from "../../../../../components/general";
import { useUpdateTitle } from "../../../../../hooks/useTitle";
import ToolBar from "../../../../../components/toolbar";
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
import classes from "./cadastro-pedido.module.css";

function CadastroPedido(props: any) {
  const { opened, onClose, value } = props;

  const [pedido, setPedido] = useState({});

  useEffect(() => {
    setPedido(value);
  }, [value])

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title="Cadastro de Pedido"
      >
        <Group position="right" mt={20} spacing={8}>
          <Button type="reset" onClick={onClose} variant="outline">
            Cancelar
          </Button>
          <Button type="submit">Enviar</Button>
        </Group>
      </Modal>
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
})(CadastroPedido);
