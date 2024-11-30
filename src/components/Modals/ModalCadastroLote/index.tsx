import { Box, Button, Divider, Grid, Input, Modal, NumberInput, Select, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import DataTable from "../../general/DataTable";
import ClearableInput from "../../general/ClearableInput";
import { IconChevronDown } from "@tabler/icons-react";
import ProdutoService from "../../../services/departamento/estoque/produto";
import { notifications } from "@mantine/notifications";
import LoteService from "../../../services/departamento/estoque/lotes";
import DateInput from "../../general/DateInput";

interface ComponentProps {
    open?: boolean;
    close?: () => void;
    fetchLotes?: () => void;
}

export default function ModalCadastroLote({ open, close, fetchLotes }: ComponentProps) {
    const [produtosList, setProdutosList] = useState([]);
    const originalFormData = {
        nome: '',
        dataFabricacao: undefined,
        dataValidade: undefined,
        quantidade: 0,
        produto: 0,
        valorUnitario: undefined,
    }
    useEffect(() => {
        setFormData(originalFormData)
        fetchProdutos();
    }, [open]);

    const [formData, setFormData] = useState(originalFormData);

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
                fetchLotes();
            }, 750);
            close();
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
                    <Grid.Col span={6}>
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
                    <Grid.Col span={6}>
                        <NumberInput
                            name="valorUnitario"
                            onChange={(value) => setFormData({ ...formData, valorUnitario: Number(value) })}
                            value={formData.valorUnitario}
                            label="Valor unitário"
                            required
                            min={0}
                            step={0.01}
                        />
                    </Grid.Col>
                        
                    <Grid.Col span={6}>
                        <NumberInput
                            name="quantidade"
                            onChange={(value) => setFormData({ ...formData, quantidade: Number(value) })}
                            value={formData.quantidade}
                            label="Quantidade à inserir"
                            required
                        />
                    </Grid.Col>
                </Grid>

                <Grid>
                    <Grid.Col span={6}>
                        <DateInput
                            setValue={(value) => setFormData((prevState) => ({
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
                            setValue={(value) => setFormData((prevState) => ({
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