import React from "react";
import { AppShell, Burger, Code, Group, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from './AppBar.module.css'

export default (props: any) => {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell.Header>
            <Group h="100%" px="md" justify="space-between">
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                <Code fw={700}>NA MEDIDA</Code>
                <Group ml="xl" gap={30} visibleFrom="sm">
                    <UnstyledButton className={classes.control}>NOTIFICACOES</UnstyledButton>
                    <UnstyledButton className={classes.control}>CONTA</UnstyledButton>
                </Group>
            </Group>
        </AppShell.Header>
    );
};