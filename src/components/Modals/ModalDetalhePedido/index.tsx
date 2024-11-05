import { Box, Divider, Grid, Modal, Text } from "@mantine/core";
import { useState } from "react";
import DataTable from "../../general/DataTable";

interface ComponentProps {
    open?: boolean;
    close?: () => void;
}

export default function ModalDetalhePedido({ open, close }: ComponentProps) {
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
                        Detalhes do pedido
                    </Text>}
            >
                <Divider size="xs" />

                <Box display={'flex'}>
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Código:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        1
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Escola solicitante:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        Escola X
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Representante:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        Fulano
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Endereço escola:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        X
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Telefone contato:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        X
                    </Text>
                </Box>

                <Box display={'flex'}>
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Data do pedido:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        12/12/2012
                    </Text>
                </Box>

                <DataTable headerElements={tableHeaders} elements={elements} />

            </Modal>
        </>
    );
}