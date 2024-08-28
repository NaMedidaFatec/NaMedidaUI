"use client";
import { Grid, useComputedColorScheme } from "@mantine/core";
import React from "react";

export default function ToolBar({ children }) {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const classes = {
    toolbar: {
      backgroundColor: computedColorScheme === "dark" ? "#000" : "#fff",
      color: computedColorScheme === "dark" ? "#fff" : "#000",
      height: 100,
      width: 20,
    },
  };

  return <Grid className={classes.toolbar}>{children}</Grid>;
}
