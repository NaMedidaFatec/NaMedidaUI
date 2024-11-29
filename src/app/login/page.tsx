"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Form, withFormik } from "formik";
import UserValidation from "../../validations/login";
import { User } from "../../model/user";
import {
  Button,
  Container,
  Input,
  Title,
} from "../../components/general";
import { Anchor, Box, Grid, Group, Image, PasswordInput, Radio, Select, Text, useComputedColorScheme } from "@mantine/core";
import { useAuth } from "../../hooks/useAuth";
import UserService from "../../services/user";
import moment from "moment";
import { notifications } from "@mantine/notifications";
import EscolaService from "../../services/escola";
import { IconChevronDown } from "@tabler/icons-react";

function Login(props) {
  const { errors, values, handleChange, handleSubmit, handleBlur, status } =
    props;

  const { signin } = useAuth();

  const [currentState, setCurrentState] = useState("LOGIN");
  const [cidades, setCidades] = useState([]);
  const [escolas, setEscolas] = useState([]);

  const [registerFields, setRegisterFields] = useState({
    tipoUsuario: "UNIDADE_ENSINO",
    nome: "",
    cpf: "",
    dataNascimento: moment().format('YYYY-MM-DD'),
    email: "",
    username: "",
    password: "",
    setor: "",
    cargo: "",
    registro: "",
    unidadeEnsino: 0,
    enderecoForm: {
      numero: "",
      logradouro: "",
      complemento: "",
      bairro: "",
      cep: "",
      cidade: 0
    },
    telefoneForm: {
      numero: "",
      ddd: ""
    }
  });

  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  useEffect(() => {
    if (status && status.user) {
      handleLogin(status.user);
    }
  }, [status]);

  useEffect(() => {
    fetchAddress();
    fetchEscolas();
  }, []);

  const fetchAddress = async () => {
    const cidades = await UserService.fetchCidades();
    setCidades(cidades?.content?.map(cidade => ({
      id: cidade.id,
      nome: cidade.nome
    })));
  };

  const fetchEscolas = async () => {
    const escolas = await EscolaService.fetchAtivos(true);
    setEscolas(escolas?.content?.map(escola => ({
      id: escola.id,
      nome: escola.nome
    })));
  };


  const handleLogin = async (values: User) => {
    try {
      await signin(values);
    } catch (error) {
      console.error(error);
      notifications.show({ title: 'Erro no login!', message: error?.message, position: 'bottom-left', color: 'red' })
    }
  };

  const handleRegistro = async (event) => {
    try {
      const novoRegistro = await UserService.register(registerFields).then(
        await EscolaService.saveResponsavel(registerFields?.nome)
      );
      console.log(novoRegistro);
      notifications.show({ title: 'Registrado com sucesso!', message: "Entre em sua conta agora", position: 'bottom-left' });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      notifications.show({ title: 'Erro no registro!', message: error?.message, position: 'bottom-left', color: 'red' })
    }
  };

  const handleFormattingChange = (event, fieldName) => {
    let formattedField = "";
    if (fieldName === "cpf") {
      formattedField = formatarCPF(event?.target?.value);
      setRegisterFields({ ...registerFields, cpf: formattedField });
    }
    if (fieldName === "ddd") {
      formattedField = formatarDDD(event?.target?.value);
      setRegisterFields({
        ...registerFields,
        telefoneForm: {
          ...registerFields.telefoneForm,
          ddd: formattedField
        }
      })
    }
    if (fieldName === "telefone") {
      formattedField = formatarTelefone(event?.target?.value);
      setRegisterFields({
        ...registerFields,
        telefoneForm: {
          ...registerFields.telefoneForm,
          numero: formattedField
        }
      })
    }
    if (fieldName === "cep") {
      formattedField = formatarCEP(event?.target?.value);
      setRegisterFields({
        ...registerFields,
        enderecoForm: {
          ...registerFields.enderecoForm,
          cep: formattedField
        }
      })
    }
  };

  const formatarCPF = (cpf) => {
    // Apenas numeros
    cpf = cpf.replace(/\D/g, '');

    // Maximo 11 digitos
    cpf = cpf.slice(0, 11);

    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    return cpf;
  }

  const formatarDDD = (ddd) => {
    // Apenas numeros
    ddd = ddd.replace(/\D/g, '');

    // Maximo 4 digitos
    ddd = ddd.slice(0, 2);

    return ddd.replace(/(\d{2})/, '($1)');
  }

  const formatarTelefone = (telefone) => {
    // Apenas numeros
    telefone = telefone.replace(/\D/g, '');

    // Maximo 10 digitos
    telefone = telefone.slice(0, 9);

    return telefone.replace(/(\d{5})(\d{4})$/, '$1-$2');
  }

  const formatarCEP = (telefone) => {
    // Apenas numeros
    telefone = telefone.replace(/\D/g, '');

    // Maximo 8 digitos
    telefone = telefone.slice(0, 8);

    return telefone.replace(/(\d{5})(\d{3})$/, '$1-$2');
  }

  const isPasswordStrong = (senha) => {
    const hasUpperCase = /[A-Z]/.test(senha);
    const hasLowerCase = /[a-z]/.test(senha);
    const hasNumber = /\d/.test(senha);

    return hasUpperCase && hasLowerCase && hasNumber;
  };

  const renderState = () => {
    switch (currentState) {
      case "LOGIN":
        return (
          <>
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
              type={String}
              sufixComponent={undefined}
            />

            <PasswordInput
              name="password"
              value={values.password}
              label="Senha"
              placeholder="Senha"
              onChange={handleChange}
              onBlur={handleBlur}
              required
              mt='sm'
            />

            <Radio.Group
              label="Sou um usuário:"
              withAsterisk
              mt='sm'
            >
              <Group mt="xs">
                <Radio
                  name="tipoUsuario"
                  value="DEPARTAMENTO"
                  label="DEPARTAMENTO"
                  onChange={handleChange} />
                <Radio
                  name="tipoUsuario"
                  value="UNIDADE_ENSINO"
                  label="ESCOLA"
                  onChange={handleChange} />
              </Group>
            </Radio.Group>

            <Button fullWidth mt="xl" size="md" type="submit">
              Login
            </Button>

            <Text ta="center" mt="md">
              Não possui conta?{" "}
              <Anchor
                href="#"
                fw={700}
                onClick={() => setCurrentState("REGISTRO")}
              >
                Registre-se
              </Anchor>
            </Text>
          </>
        );
      case "REGISTRO":
        return (
          <>
            <Title order={2} ta="center" mt="md" mb={50}>
              Crie sua conta
            </Title>

            <Input
              name="nome"
              value={registerFields.nome}
              onChange={(event) => setRegisterFields({ ...registerFields, nome: event.target.value })}
              label="Nome"
              placeholder="Nome"
              onBlur={handleBlur}
              // validate={errors.registroNomeRepresentante}
              required
              type={undefined}
              sufixComponent={undefined}
            />

            <Input
              name="cpf"
              value={registerFields.cpf}
              onChange={(e) => handleFormattingChange(e, "cpf")}
              label="CPF"
              placeholder="CPF"
              onBlur={handleBlur}
              required
              type={undefined}
              sufixComponent={undefined}
            />

            <Grid>
              <Grid.Col span={2}>
                <Input
                  name="ddd"
                  value={registerFields.telefoneForm?.ddd}
                  onChange={(e) => handleFormattingChange(e, "ddd")}
                  label="DDD"
                  placeholder="DDD"
                  onBlur={handleBlur}
                  required
                  type={undefined}
                  sufixComponent={undefined}
                />
              </Grid.Col>
              <Grid.Col span={10}>
                <Input
                  name="telefone"
                  value={registerFields.telefoneForm?.numero}
                  onChange={(e) => handleFormattingChange(e, "telefone")}
                  label="Telefone"
                  placeholder="Contato"
                  onBlur={handleBlur}
                  required
                  type={undefined}
                  sufixComponent={undefined}
                />
              </Grid.Col>
            </Grid>

            <Input
              name="email"
              value={registerFields.email}
              onChange={(event) => setRegisterFields({ ...registerFields, email: event.target.value })}
              label="E-mail"
              placeholder="E-mail"
              onBlur={handleBlur}
              validate={errors.email}
              required
              type={undefined}
              sufixComponent={undefined}
            />

            <Container display="flex" px={0} style={{ gap: "1rem" }}>
              <PasswordInput
                name="registroSenha"
                value={registerFields.password}
                onChange={(event) => setRegisterFields({ ...registerFields, password: event.target.value })}
                label="Senha"
                placeholder="Senha"
                onBlur={handleBlur}
                required
                type={undefined}
                style={{ width: "50%" }}
              />

              <PasswordInput
                name="registroSenhaConfirmar"
                value={values.registroSenhaConfirmar}
                label="Confirmar Senha"
                placeholder="Confirmar Senha"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                type={undefined}
                style={{ width: "50%" }}
              />
            </Container>

            <Radio.Group
              label="Sou um usuário:"
              withAsterisk
              mt='sm'
            >
              <Group mt="xs">
                <Radio
                  name="tipoUsuario"
                  value="DEPARTAMENTO"
                  label="DEPARTAMENTO"
                  onChange={(e) => setRegisterFields({ ...registerFields, tipoUsuario: e?.target?.value })} />
                <Radio
                  name="tipoUsuario"
                  value="UNIDADE_ENSINO"
                  label="ESCOLA"
                  onChange={(e) => setRegisterFields({ ...registerFields, tipoUsuario: e?.target?.value })} />
              </Group>
            </Radio.Group>

            <Button
              fullWidth
              mt="xl"
              size="md"
              onClick={() => {
                if (registerFields.password !== values.registroSenhaConfirmar) {
                  notifications.show({ title: 'Erro no registro!', message: "Senhas não coincidem!", position: 'bottom-left', color: 'red' })
                  return;
                }
                if (!isPasswordStrong(registerFields?.password)) {
                  notifications.show({ title: 'Erro no registro!', message: "Senha muito fraca!", position: 'bottom-left', color: 'red' })
                  return;
                }
                setCurrentState("CONTINUARREGISTRO");
              }
              }
            >
              CONTINUAR REGISTRO
            </Button>

            <Text ta="center" mt="md">
              Já possui conta?{" "}
              <Anchor
                href="#"
                fw={700}
                onClick={() => setCurrentState("LOGIN")}
              >
                Entrar
              </Anchor>
            </Text>
          </>
        );
      case "CONTINUARREGISTRO":
        return (
          <>
            <Title order={2} ta="center" mt="md" mb={50}>
              Concluir registro
            </Title>
            {registerFields?.tipoUsuario === 'UNIDADE_ENSINO' && (
              <Select
                data={escolas?.map(escola => ({
                  value: escola.id.toString(),
                  label: escola.nome
                }))}
                label="Escola"
                placeholder="Escola"
                onChange={(value) => setRegisterFields({
                  ...registerFields,
                  unidadeEnsino: parseInt(value)
                })}
                onBlur={handleBlur}
                required
              />
            )}

            <Container display="flex" px={0} style={{ gap: "1rem" }}>
              <Input
                name="registroSetor"
                value={registerFields?.setor}
                onChange={(event) => setRegisterFields({
                  ...registerFields,
                  setor: event.target.value
                })}
                label="Setor"
                placeholder="Setor"
                onBlur={handleBlur}
                validate={errors.registroSetor}
                required
                type={undefined}
                sufixComponent={undefined}
                style={{ width: "50%" }}
              />

              <Select
                name="registroCargo"
                label="Cargo"
                placeholder="Cargo"
                onChange={(value) => setRegisterFields({
                  ...registerFields,
                  cargo: value
                })}
                onBlur={handleBlur}
                required
                style={{ width: "50%" }}
                data={[
                  { value: "DIRETORIA", label: "Diretoria" },
                  { value: "COORDENAÇÃO", label: "Coordenação" },
                  { value: "PROFESSOR", label: "Professor" },
                  { value: "OUTROS", label: "Outros" },]}
              >
              </Select>
            </Container>

            <Input
              name="registroRua"
              value={registerFields.enderecoForm?.logradouro}
              onChange={(event) => setRegisterFields({
                ...registerFields,
                enderecoForm: {
                  ...registerFields.enderecoForm,
                  logradouro: event.target.value
                }
              })}
              label="Rua"
              placeholder="Rua"
              onBlur={handleBlur}
              validate={errors.registroRua}
              required
              type={undefined}
              sufixComponent={undefined}
            />

            <Container display="flex" px={0} style={{ gap: "1rem" }}>
              <Input
                name="registroBairro"
                value={registerFields.enderecoForm?.bairro}
                onChange={(event) => setRegisterFields({
                  ...registerFields,
                  enderecoForm: {
                    ...registerFields.enderecoForm,
                    bairro: event.target.value
                  }
                })}
                label="Bairro"
                placeholder="Bairro"
                onBlur={handleBlur}
                validate={errors.registroBairro}
                required
                type={undefined}
                sufixComponent={undefined}
                style={{ width: "50%" }}
              />

              <Select
                name="registroCidade"
                data={cidades.map(cidade => ({
                  value: cidade.id.toString(),
                  label: cidade.nome
                }))}
                label="Cidade"
                placeholder="Cidade"
                onChange={(value) => setRegisterFields({
                  ...registerFields,
                  enderecoForm: {
                    ...registerFields.enderecoForm,
                    cidade: parseInt(value)
                  }
                })}
                onBlur={handleBlur}
                required
                style={{ width: "50%" }}
              />
            </Container>

            <Container display="flex" px={0} style={{ gap: "1rem" }}>
              <Input
                name="registroNumero"
                value={registerFields.enderecoForm?.numero}
                onChange={(event) => setRegisterFields({
                  ...registerFields,
                  enderecoForm: {
                    ...registerFields.enderecoForm,
                    numero: event.target.value
                  }
                })}
                label="Número"
                placeholder="Número"
                onBlur={handleBlur}
                validate={errors.registroNumero}
                required
                type={undefined}
                sufixComponent={undefined}
                style={{ width: "50%" }}
              />

              <Input
                name="registroCEP"
                value={registerFields.enderecoForm?.cep}
                onChange={(e) => handleFormattingChange(e, "cep")}
                label="CEP"
                placeholder="CEP"
                onBlur={handleBlur}
                validate={errors.registroCEP}
                required
                type={undefined}
                sufixComponent={undefined}
                style={{ width: "50%" }}
              />
            </Container>

            <Button fullWidth mt="xl" size="md" type="button" onClick={(e) => handleRegistro(e)}>
              FINALIZAR REGISTRO
            </Button>

            <Text ta="center" mt="md">
              Já possui conta?{" "}
              <Anchor
                href="#"
                fw={700}
                onClick={() => setCurrentState("LOGIN")}
              >
                Entrar
              </Anchor>
            </Text>
          </>
        );
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* <Container
        fluid
        display="flex"
        h="100vh"
        px={0}
        style={{ alignItems: "center" }}
      > */}
      <Grid overflow="hidden">
        <Grid.Col span={7}>
          <Image
            h="100vh"
            src="/loginImage.png"
          />
        </Grid.Col>
        <Grid.Col span={5} >
          <Container
            fluid
            h="100%"
            display="flex"
            px={0}
            style={{ alignItems: "center", flexDirection: "column" }}
          >
            <Image
              src={computedColorScheme === "dark" ? "/logoDark.png" : "/logo.png"}
              maw={'30rem'}
              fit="contain"
              style={{ marginBlock: '6rem' }}
            />
            <Box w="90%">
              {renderState()}
            </Box>
          </Container>
        </Grid.Col>
      </Grid>
    </Form>
  );
}

export default withFormik({
  validateOnChange: false,
  validateOnBlur: false,
  mapPropsToValues: () => new User(),
  validationSchema: UserValidation,
  handleSubmit: async (user: User, { setStatus }) => {
    try {
      await setStatus({ user });
    } catch (error) {
      setStatus({ error: "Ocorreu um erro durante o login" });
    }
  },
})(Login);
