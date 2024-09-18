"use client";
import { Grid } from "@mantine/core";
import React from "react";
import classes from "./toolbar.module.css";

export default function ToolBar({ children }) {
  return (
    <Grid className={classes.toolbar}>
      <Grid.Col span={12}>{children}</Grid.Col>
    </Grid>
  );
}
