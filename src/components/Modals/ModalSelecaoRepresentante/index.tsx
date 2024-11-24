import { Box, Button, Divider, Grid, Input, Modal, NumberInput, Select, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import ClearableInput from "../../general/ClearableInput";
import { IconChevronDown } from "@tabler/icons-react";

interface ComponentProps {
    open?: boolean;
    close?: () => void;
}

export default function ModalSelecaoRepresentante({ open, close }: ComponentProps) {
    const tableHeaders = ["CÓD", "PRODUTO", "DESC", "QUANTIDADE"];

    // useEffect(() => {
    //     setFormData(prevState => ({
    //         ...prevState,
    //         departamento: loggedUser?.departamento.id ? loggedUser?.departamento.id : undefined
    //     }));
    //     fetchCidades();
    // }, [open]);


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
                        Selecionar representante
                    </Text>}
            >
                <Divider size="xs" />

                <Input.Wrapper label={"Cidade"} required>
                    <Input
                        component="select"
                        name="enderecoForm.cidade"
                        onChange={() => 1}
                        rightSection={<IconChevronDown size={14} stroke={1.5} />}
                        pointer
                    >
                        <option
                            defaultValue=""
                            disabled
                            selected
                        >
                            Selecione a cidade
                        </option>
                        {/* {tableHeaders.map(cidade => (
                            <option
                                key={cidade?.id}
                                value={Number(cidade?.id)}
                            >
                                {cidade?.nome}
                            </option>
                        ))} */}
                    </Input>
                </Input.Wrapper>

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