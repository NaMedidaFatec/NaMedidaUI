import { Title } from "@mantine/core";
import React from "react";

export default (props) => {
  const { classes, children, ...other } = props;
  return <Title className={classes?.container} {...other}>{children}</Title>;
};
