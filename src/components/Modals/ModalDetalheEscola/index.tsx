import { Box, Divider, Modal, Text } from "@mantine/core";
import { useState } from "react";

export default function ModalDetalheEscola({ open, close, escola }) {

    return (
        <>
            <Modal
                opened={open}
                onClose={close}
                centered
                size="auto"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
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
                        {escola?.nome}
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Código identificador da escola (CIE):
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        {escola?.cie}
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Representante:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        {escola?.representante}
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        E-mail:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        {escola?.email}
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Endereço:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        {escola?.logradouro},  {escola?.bairro},  {escola?.numero}
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        CEP:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        {escola?.cep}
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Telefone:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        ( {escola?.ddd} ) {escola?.telefone}
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Qtd turmas:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        {escola?.qtdTurmas}
                    </Text>
                </Box>
            </Modal>
        </>
    );
}