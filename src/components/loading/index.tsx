"use client";
import { Box, Group, Text } from "@mantine/core";
import { IconCircle } from "@tabler/icons-react";
import React from "react";

export default function Loading(props: any) {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Group spacing={20}>
        <IconCircle size={40} />
        <Text>Loading...</Text>
      </Group>
    </Box>
  );
}
