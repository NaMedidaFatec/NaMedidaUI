import { Paper } from "@mantine/core";
import React from "react";

export default (props) => {
  const { classes, children, ...other } = props;
  return <Paper className={classes?.container} {...other}>{children}</Paper>;
};
