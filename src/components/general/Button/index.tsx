import React, { useState } from "react";
import { Button } from "@mantine/core";

export default (props) => {
  const { classes, children, ...other } = props;
  return <Button className={classes?.container} {...other}>{children}</Button>;
};

