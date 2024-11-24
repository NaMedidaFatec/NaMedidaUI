import { Box, Button, Divider, Grid, Modal, NumberInput, Select, Text } from "@mantine/core";
import { useState } from "react";
import DataTable from "../../general/DataTable";
import ClearableInput from "../../general/ClearableInput";

interface ComponentProps {
    open?: boolean;
    close?: () => void;
}

export default function ModalEntradaEstoque({ open, close }: ComponentProps) {
    const tableHeaders = ["CÓD", "PRODUTO", "DESC.", "QUANTIDADE"];

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
                        Entrada Estoque
                    </Text>}
            >
                <Divider size="xs" />

                <Grid mt='md'>
                    <Grid.Col span={5}>
                        <ClearableInput
                            placeholder="Macarrão"
                            label='Nome'
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={7}>
                        <ClearableInput
                            placeholder="Macarrão espaguete nro. 8"
                            label='Descrição'
                            required
                        />
                    </Grid.Col>
                </Grid>

                <Grid>
                    <Grid.Col span={8}>
                        <ClearableInput
                            placeholder="Código"
                            label='Código de barras'
                            required
                        />
                    </Grid.Col>

                    <Grid.Col span={4}>
                        <Select
                            required
                            label="Categoria"
                            placeholder="Escolha..."
                            data={['Massas', 'Grãos']}
                        />
                    </Grid.Col>
                </Grid>

                <Button
                    mt='md'
                    fullWidth
                    variant="gradient"
                    fs='22rem'
                >
                    ENTRADA
                </Button>
            </Modal>
        </>
    );
}