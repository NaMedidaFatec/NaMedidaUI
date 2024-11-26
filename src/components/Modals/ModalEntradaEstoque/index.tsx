import { Box, Button, Divider, Grid, Input, Modal, NumberInput, Select, Text } from "@mantine/core";
import { useState } from "react";
import DataTable from "../../general/DataTable";
import ClearableInput from "../../general/ClearableInput";
import { IconChevronDown } from "@tabler/icons-react";

interface ComponentProps {
    open?: boolean;
    close?: () => void;
}

export default function ModalEntradaEstoque({ open, close }: ComponentProps) {


    return (
        <>
            <Modal
                opened={open}
                onClose={close}
                centered
                size="60vw"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                title={
                    <Text size="xl" fw={200}>
                        Registrar Entrada Estoque
                    </Text>
                }
            >
                <Divider size="xs" />
                <Grid>
                    <Grid.Col span={12}>
                        <Box display={"flex"}>
                            <Text size="1.1rem" fw={700} mt={"1.5rem"} mr={".5rem"}>
                                Item:
                            </Text>
                            <Text size="1.1rem" fw={200} mt={"1.5rem"}>
                                id - nome, desc
                            </Text>
                        </Box>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Box display={"flex"}>
                            <Text size="1.1rem" fw={700} mt={"1.5rem"} mr={".5rem"}>
                                Quantidade total em estoque (Todos os lotes):
                            </Text>
                            <Text size="1.1rem" fw={200} mt={"1.5rem"}>
                                1000
                            </Text>
                        </Box>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Divider size="xs" />
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <Input.Wrapper label={"Produto"} required>
                            <Input
                                disabled
                                component="select"
                                name="separadoPor"
                                onChange={() => 1}
                                rightSection={<IconChevronDown size={14} stroke={1.5} />}
                                pointer
                            >
                                {/* {[pedidoItem?.produto].map((user) => (
                                    <option key={user?.id} value={Number(user?.id)}>
                                        {user?.nome} - {user?.descricao}
                                    </option>
                                ))} */}
                            </Input>
                        </Input.Wrapper>
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <Input.Wrapper label={"Lote"} required>
                            <Input
                                component="select"
                                name="estoque"
                                value={1}
                                onChange={() => 1}
                                rightSection={<IconChevronDown size={14} stroke={1.5} />}
                                pointer
                            >
                                {/* <option
                                    defaultValue=""
                                    selected
                                >
                                    Selecione o lote
                                </option>
                                {lotes.map((lote) => (
                                    <option key={lote?.id} value={Number(lote?.id)}>
                                        {lote?.id} - {lote?.nome}:  Quantidade disponível: {lote.quantidade}
                                    </option>
                                ))} */}
                            </Input>
                        </Input.Wrapper>
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <NumberInput
                            // max={pedidoItem?.quantidadePendente}
                            name="quantidadeEntregue"
                            onChange={() => 1}
                            value={1}
                            label="Quantidade"
                            required
                        />
                    </Grid.Col>
                </Grid>

                <Button
                    mt="md"
                    fullWidth
                    variant="gradient"
                    fs="22rem"
                    onClick={() => 1}
                >
                    SALVAR
                </Button>
            </Modal>
        </>
    );
}