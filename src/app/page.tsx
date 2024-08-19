"use client";

import React, { useState } from "react";
import { ErrorMessage, Field, Form, withFormik } from "formik";
import UserValidation from "../validations/login";
import { User } from "../model/user";
import UserService from "../services/user";
import {
  Button,
  Container,
  Input,
  Paper,
  Title,
} from "../components/general";
import * as Yup from "yup";
import { Anchor, Image, Text } from "@mantine/core";

const Login = (props: any) => {
  const { errors, values, handleChange, handleSubmit, handleBlur } = props;
  const [register, setRegister] = useState(false);

  return (
    <Form onSubmit={handleSubmit}>
      <Container fluid display='flex' h='100vh' px={0} style={{ alignItems: 'center' }}>

        {!register ? (
          <>
            <Paper radius={0} px={30} w='40%'>

              <Title order={2} ta="center" mt="md" mb={50}>
                Seja bem-vindo!
              </Title>

              <Input
                name="email"
                value={values.email}
                label="E-mail"
                placeholder="E-mail"
                onChange={handleChange}
                onBlur={handleBlur}
                validate={errors.email}
                required
                type={undefined}
                sufixComponent={undefined}
              />

              <Input
                name="senha"
                value={values.senha}
                label="Senha"
                placeholder="Senha"
                onChange={handleChange}
                onBlur={handleBlur}
                validate={errors.senha}
                required
                type={undefined}
                sufixComponent={undefined}
              />

              <Button fullWidth mt="xl" size="md" type="submit">
                Login
              </Button>

              <Text ta="center" mt="md">
                Não possui conta?{' '}
                <Anchor href="#" fw={700} onClick={() => setRegister(true)}>
                  Registre-se
                </Anchor>
              </Text>

            </Paper>

            <Image
              fit='fill'
              w='auto'
              maw='60%'
              h='100%'
              src="/loginImage.png" />
          </>
        ) : (
          <>
            <Image
              fit='fill'
              w='auto'
              maw='60%'
              h='100%'
              src="/loginImage.png" />

            <Paper radius={0} px={30} w='40%'>

              <Title order={2} ta="center" mt="md" mb={50}>
                Crie sua conta
              </Title>

              <Input
                name="registroNomeRepresentante"
                value={values.registroNomeRepresentante}
                label="Nome do representante"
                placeholder="Nome do representante"
                onChange={handleChange}
                onBlur={handleBlur}
                validate={errors.registroNomeRepresentante}
                required
                type={undefined}
                sufixComponent={undefined}
              />

              <Input
                name="registroCpf"
                value={values.registroCpf}
                label="CPF"
                placeholder="CPF"
                onChange={handleChange}
                onBlur={handleBlur}
                validate={errors.registroCpf}
                required
                type={undefined}
                sufixComponent={undefined}
              />

              <Input
                name="registroEmail"
                value={values.registroEmail}
                label="E-mail"
                placeholder="E-mail"
                onChange={handleChange}
                onBlur={handleBlur}
                validate={errors.registroEmail}
                required
                type={undefined}
                sufixComponent={undefined}
              />

              <Container display='flex' px={0} style={{ gap: '1rem' }}>
                <Input
                  name="registroSenha"
                  value={values.registroSenha}
                  label="Senha"
                  placeholder="Senha"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  validate={errors.registroSenha}
                  required
                  type={undefined}
                  sufixComponent={undefined}
                  style={{ width: '50%' }}
                />

                <Input
                  name="registroSenhaConfirmar"
                  value={values.registroSenhaConfirmar}
                  label="Confirmar Senha"
                  placeholder="Confirmar Senha"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  validate={errors.registroSenhaConfirmar}
                  required
                  type={undefined}
                  sufixComponent={undefined}
                  style={{ width: '50%' }}

                />
              </Container>


              <Button fullWidth mt="xl" size="md" type="submit">
                CONTINUAR REGISTRO
              </Button>

              <Text ta="center" mt="md">
                Já possui conta?{' '}
                <Anchor href="#" fw={700} onClick={() => setRegister(false)}>
                  Entrar
                </Anchor>
              </Text>

            </Paper>
          </>
        )}

      </Container>
    </Form>
  );
};

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
})(Login);
