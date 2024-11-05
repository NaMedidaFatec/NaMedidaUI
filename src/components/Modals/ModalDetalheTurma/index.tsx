import { Box, Divider, Modal, Text } from "@mantine/core";
import { useState } from "react";

interface ComponentProps {
    open?: boolean;
    close?: () => void;
}

export default function ModalDetalheTurma({ open, close }: ComponentProps) {

    return (
        <>
            <Modal
                opened={open}
                onClose={close}
                centered
                size="35rem"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                title={
                    <Text size="xl" fw={200}>
                        Detalhes da turma
                    </Text>}
            >
                <Divider size="xs" />

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Descrição:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        Turma 1º fundamental
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Periodo:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        Matutino
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Número de alunos:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        20
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Número da sala:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        12
                    </Text>
                </Box>
            </Modal>
        </>
    );
}