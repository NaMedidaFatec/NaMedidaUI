import { Box, Button, Divider, Grid, Input, Modal, NumberInput, Select, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import DataTable from "../../general/DataTable";
import ClearableInput from "../../general/ClearableInput";
import { IconChevronDown } from "@tabler/icons-react";
import ProdutoService from "../../../services/departamento/estoque/produto";
import { notifications } from "@mantine/notifications";
import { DateInput, DateTimePicker } from "@mantine/dates";
import LoteService from "../../../services/departamento/estoque/lotes";

interface ComponentProps {
    open?: boolean;
    close?: () => void;
}

export default function ModalCadastroLote({ open, close }: ComponentProps) {
    const [produtosList, setProdutosList] = useState([]);

    useEffect(() => {
        fetchProdutos();
    }, [open]);

    const [formData, setFormData] = useState({
        nome: '',
        dataFabricacao: undefined,
        dataValidade: undefined,
        quantidade: 0,
        produto: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e?.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: name === 'produto' ? Number(value) : value
        }));
    };

    const fetchProdutos = async () => {
        const produtos = await ProdutoService.fetchAll();
        const produtosList = produtos?.content?.map(produto => ({
            id: produto?.id,
            nome: produto?.nome,
            codigoDeBarras: produto?.codigoDeBarras,
        }));

        setProdutosList(produtosList);
    };

    const saveLote = async () => {
        try {
            await LoteService.createLote(formData);
            notifications.show({ title: 'Salvo com sucesso', message: '', position: 'bottom-left', color: 'blue' });
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        } catch (error) {
            console.log(error);
            notifications.show({ title: 'Erro ao salvar', message: error?.message, position: 'bottom-left', color: 'red' });
        }
    };

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
                        Novo Lote
                    </Text>}
            >
                <Divider size="xs" />

                <Grid mt='md'>
                    <Grid.Col span={6}>
                        <TextInput
                            name="nome"
                            onChange={handleChange}
                            value={formData.nome}
                            label='Nome'
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Input.Wrapper label={"Produto"} required>
                            <Input
                                component="select"
                                name="produto"
                                onChange={handleChange}
                                rightSection={<IconChevronDown size={14} stroke={1.5} />}
                                pointer
                            >
                                <option
                                    defaultValue=""
                                    disabled
                                    selected
                                >
                                    Selecione o produto
                                </option>
                                {produtosList?.map(produto => (
                                    <option
                                        key={produto?.id}
                                        value={Number(produto?.id)}
                                    >
                                        {produto?.nome}
                                    </option>
                                ))}
                            </Input>
                        </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <NumberInput
                            name="quantidade"
                            onChange={(value) => setFormData({ ...formData, quantidade: Number(value) })}
                            value={formData.quantidade}
                            label="Quantidade"
                            required
                        />
                    </Grid.Col>
                </Grid>

                <Grid>
                    <Grid.Col span={6}>
                        <DateInput
                            onChange={(value) => setFormData((prevState) => ({
                                ...prevState,
                                dataFabricacao: value
                            }))}
                            name="dataFabricacao"
                            label="Data fabricação"
                            placeholder={formData.dataFabricacao}
                            required
                        />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <DateInput
                            onChange={(value) => setFormData((prevState) => ({
                                ...prevState,
                                dataValidade: value
                            }))}
                            name="dataValidade"
                            label="Data validade"
                            placeholder={formData.dataValidade}
                            required
                        />
                    </Grid.Col>
                </Grid>

                <Button
                    mt='md'
                    fullWidth
                    variant="gradient"
                    fs='22rem'
                    onClick={saveLote}
                >
                    SALVAR
                </Button>
            </Modal>
        </>
    );
}