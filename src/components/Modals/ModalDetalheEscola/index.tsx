import { Box, Divider, Modal, Text } from "@mantine/core";
import { useState } from "react";

interface ComponentProps {
    open?: boolean;
    close?: () => void;
}

export default function ModalDetalheEscola({ open, close }: ComponentProps) {

    return (
        <>
            <Modal
                opened={open}
                onClose={close}
                centered
                size="35rem"
                title={
                    <Text size="xl" fw={200}>
                        Detalhes da escola
                    </Text>}
            >
                <Divider size="xs" />

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Nome da escola:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        Escola 1
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Código identificador da escola (CIE):
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        X
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Representante:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        Fulano de tal
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        E-mail:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        X
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Endereço:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        X
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Telefone:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        X
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Qtd turmas:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        X
                    </Text>
                </Box>
            </Modal>
        </>
    );
}