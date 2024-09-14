"use client";
import { Grid } from "@mantine/core";
import React from "react";
import classes from "./paper.module.css";

export default function Paper(props) {
  const { className, children, ...other } = props;

  return (
    <Grid className={classes.paper}>
      <Grid.Col span={12} {...other}>{children}</Grid.Col>
    </Grid>
  );
}
