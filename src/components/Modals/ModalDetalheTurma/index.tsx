import { Box, Divider, Modal, Text } from "@mantine/core";
import { useState } from "react";

export default function ModalDetalheTurma({ open, close, turma }) {

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
                        {turma?.descricao}
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Inicío da turma:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        {turma?.horarioInicial}
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Fim da turma:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        {turma?.horarioFinal}
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Número de alunos:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        {turma?.qtdAlunos}
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Número da sala:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        {turma?.sala}
                    </Text>
                </Box>
            </Modal>
        </>
    );
}