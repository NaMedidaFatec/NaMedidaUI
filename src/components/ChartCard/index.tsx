"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    Divider,
    Grid,
    Group,
    Paper,
    Text,
    useComputedColorScheme,
} from "@mantine/core";
import { Icon123 } from "@tabler/icons-react";


export default function ChartCard(props: any) {
    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    return (
        <>
            <Paper
                mah='100%'
                shadow="xl"
                radius="lg"
                bg={computedColorScheme == "dark" ? 'var(--mantine-color-dark-5)' : '#fff'}>

                <Box mih='70%' p="1.5rem" pt=".5rem" pos="relative">

                    <Paper
                        pos="absolute"
                        radius="lg"
                        h="4rem"
                        w="4rem"
                        bg="red"
                        display="flex"
                        style={{ bottom: '2.5rem', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon123 />
                    </Paper>

                    <Box ta="right">
                        <Text>
                            receba
                        </Text>
                        <Text c="blue" fw={700}>
                            Blue text
                        </Text>
                    </Box>

                </Box>

                <Divider size="xs" />

                <Group gap="xs" p="1rem">
                    <Text c="blue" fw={700}>
                        Blue text
                    </Text>

                    <Text>
                        receba
                    </Text>
                </Group>

            </Paper>
        </>
    );
}