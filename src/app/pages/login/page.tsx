"use client";

import React from "react";
import { ErrorMessage, Field, Form, withFormik } from "formik";
import UserValidation from "../../validations/login";
import { User } from "../../model/user";
import UserService from "../../services/user";
import {
  Button,
  Container,
  Input,
  Paper,
  Title,
} from "../../components/general";
import * as Yup from "yup";

const Login = (props: any) => {
  const { errors, values, handleChange, handleSubmit, handleBlur } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Paper radius={0} px={30}>
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
          <Button fullWidth mt="xl" size="md" type="submit">
            Login
          </Button>
        </Paper>
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
