import React, { useState } from "react";
import { Container } from "@mantine/core";

export default (props) => {
  const { classes, children, ...other } = props;
  return <Container className={classes?.container} {...other}>{children}</Container>;
};

