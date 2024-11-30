"use client";
import { Box, Group, Text } from "@mantine/core";
import { IconCircle } from "@tabler/icons-react";
import React from "react";
import classes from "./loading.module.css";


export default function Loading(props: any) {
  return (
    <Box className={classes.loading}>
      <Group >
        <IconCircle size={40} />
        <Text>Loading...</Text>
      </Group>
    </Box>
  );
}
