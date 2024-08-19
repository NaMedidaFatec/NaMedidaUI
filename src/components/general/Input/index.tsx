import React, { useState } from "react";
import { TextInput, InputWrapper } from "@mantine/core";
import { useForm } from "react-hook-form";
import { Field } from "formik";
export default (props) => {
  const {
    type,
    value = "",
    onChange,
    placeholder = "Digite aqui..",
    label,
    style = {},
    inputPropsStyle = {},
    required = false,
    securityTextEntry = false,
    name = "",
    sufixComponent,
    validate = null,
    editable = true,
    ...other
  } = props;

  const [isOnFocus, setIsOnFocus] = useState(false);
  const {
    formState: { errors },
  } = useForm();

  const handleFocus = () => setIsOnFocus(true);
  const handleBlur = () => setIsOnFocus(false);

  return (
    <Field
      type="email"
      name="email"
      value={value}
      onChange={onChange}
      onBlur={handleBlur}
      render={() => (
        <InputWrapper
          id={name}
          required={required}
          error={validate || errors[name]?.message}
          style={style}
          label={label}
          {...other}
        >
          <TextInput
            id={name}
            type={securityTextEntry ? "password" : "text"}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={!editable}
            radius="md"
          />
        </InputWrapper>
      )}
    ></Field>
  );
};
