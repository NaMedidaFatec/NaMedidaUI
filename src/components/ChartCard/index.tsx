"use client";

import {
    Box,
    Divider,
    Group,
    Paper,
    Text,
    useComputedColorScheme,
} from "@mantine/core";
import { Icon123, IconChartArea } from "@tabler/icons-react";


export default function ChartCard(props: any) {
    const { titulo, valorAtual, valorAnterior, porcentagem, Icon } = props;

    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    return (
        <>
            <Paper
                mah='100%'
                shadow="md"
                radius="lg"
                bg={computedColorScheme == "dark" ? 'var(--mantine-color-dark-5)' : '#fff'}>

                <Box mih='70%' p="1.5rem" pt=".5rem" pos="relative">

                    <Paper
                        pos="absolute"
                        radius="lg"
                        h="4rem"
                        w="4rem"
                        bg="blue"
                        display="flex"
                        style={{ bottom: '2.7rem', justifyContent: 'center', alignItems: 'center' }}>
                        {Icon && <Icon />}
                    </Paper>

                    <Box ta="right" pt="xs">
                        <Text>
                            {titulo}
                        </Text>
                        <Text c="blue" fw={700}>
                            {valorAtual}
                        </Text>
                    </Box>

                </Box>

                <Divider size="xs" />

                <Group gap="xs" p="1rem">
                    <Text c="blue" fw={700}>
                        + {porcentagem}
                    </Text>

                    <Text>
                        em relação ao último mês
                    </Text>
                </Group>

            </Paper>
        </>
    );
}