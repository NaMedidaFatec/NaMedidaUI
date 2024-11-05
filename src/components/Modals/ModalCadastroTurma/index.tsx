import { Box, Button, Divider, Grid, Modal, NumberInput, Select, Text } from "@mantine/core";
import { useState } from "react";
import DataTable from "../../general/DataTable";
import ClearableInput from "../../general/ClearableInput";
import { TimeInput } from "@mantine/dates";

interface ComponentProps {
    open?: boolean;
    close?: () => void;
}

export default function ModalCadastroTurma({ open, close }: ComponentProps) {
    const tableHeaders = ["Código", "Produto", "Descrição", "Quantidade"];

    const elements = [
        { id: 1, produto: 'Arroz', desc: 'SEILA', qtd: 10 },
        { id: 2, produto: 'Feijão', desc: 'SEILA', qtd: 10 },
        { id: 3, produto: 'Laranja', desc: 'SEILA', qtd: 10 },
        { id: 4, produto: 'Pão', desc: 'SEILA', qtd: 10 },
    ];

    return (
        <>
            <Modal
                opened={open}
                onClose={close}
                centered
                size="50vw"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                title={
                    <Text size="xl" fw={200}>
                        Nova Turma
                    </Text>}
            >
                <Divider size="xs" />

                <Grid mt='md'>
                    <Grid.Col span={5}>
                        <ClearableInput
                            placeholder="Turma 1º Ano A"
                            label='Descrição'
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Select
                            required
                            label="Periodo"
                            placeholder="Escolha..."
                            data={['Matutino', 'Vespertino']}
                        />
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <NumberInput
                            label="Nº Alunos"
                            placeholder="Nº Alunos"
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <NumberInput
                            label="Nº Sala"
                            placeholder="Nº Sala"
                        />
                    </Grid.Col>
                </Grid>

                <Button
                    mt='md'
                    fullWidth
                    variant="gradient"
                    fs='22rem'
                >
                    CADASTRAR
                </Button>
            </Modal>
        </>
    );
}