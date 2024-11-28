import { Box, Button, Divider, Grid, Input, Modal, NumberInput, Select, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import ProdutoService from "../../../services/departamento/estoque/produto";
import LoteService from "../../../services/departamento/estoque/lotes";

interface ComponentProps {
    open?: boolean;
    close?: () => void;
    fetchLotes?: () => void;
}

export default function ModalEntradaEstoque({ open, close, fetchLotes }: ComponentProps) {
    const originalFormDataLote = {
        nome: '',
        dataFabricacao: '',
        dataValidade: '',
        quantidade: 0,
        produto: undefined,
        loteId: undefined,
    };

    const [formData, setFormData] = useState(originalFormDataLote);
    const [produtos, setProdutos] = useState([]);

    const [lotes, setLotes] = useState([]);

    useEffect(() => {
        fetchProdutos();
    }, [open]);

    useEffect(() => {
        if (!!formData?.produto) {
            fetchLotesReferentesAoProduto(formData?.produto);
        }
    }, [formData?.produto]);

    const fetchProdutos = async () => {
        try {
            const listaProdutos = await ProdutoService.fetchAll();
            setProdutos(listaProdutos?.content?.map((produto) => ({
                id: produto?.id,
                nome: produto?.nome,
                desc: produto?.descricao,
            })));
        } catch (error) {
            console.error(error?.message);
            notifications.show({ title: 'Erro ao buscar produtos!', message: error?.message, position: 'bottom-left', color: 'red' })
        }
    }

    const fetchLotesReferentesAoProduto = async (produtoId: any) => {
        try {
            const listaLotes = await LoteService.fetchAllByProdutoWithEstoqueLivre(produtoId);
            setLotes(listaLotes?.content?.map((lote) => ({
                id: lote?.id,
                nome: lote?.nome,
                dataFabricacao: lote?.dataFabricacao,
                dataValidade: lote?.dataValidade,
                quantidade: lote?.quantidade,
            })));
        } catch (error) {
            console.error(error?.message);
            notifications.show({ title: 'Erro ao buscar lotes!', message: error?.message, position: 'bottom-left', color: 'red' })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e?.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: (name === "produto" || name === "quantidade") ? Number(value) : value
        }));
    };

    const handleLoteChange = (loteId: number) => {
        const loteSelecionado = lotes.find((lote) => lote?.id === loteId);

        if (loteSelecionado) {
            setFormData((prevState) => ({
                ...prevState,
                nome: loteSelecionado?.nome,
                dataFabricacao: loteSelecionado?.dataFabricacao,
                dataValidade: loteSelecionado?.dataValidade,
                loteId: loteSelecionado?.id
            }));
        }
    };

    const salvarLote = async () => {
        try {
            const { loteId, quantidade } = formData;
            
            await LoteService.adicionarAoEstoque(loteId, quantidade);
            notifications.show({ title: 'Salvo com sucesso', message: '', position: 'bottom-left', color: 'blue' });
            setTimeout(() => {
                fetchLotes();
            }, 750);
            close();
        } catch (error) {
            console.error(error?.message);
            notifications.show({ title: 'Erro ao salvar lotes!', message: error?.message, position: 'bottom-left', color: 'red' })
        }
    }

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

                    <Grid.Col span={12} mt='md'>
                        <Input.Wrapper label={"Produto"} required>
                            <Input
                                component="select"
                                name="produto"
                                onChange={handleChange}
                                value={formData.produto}
                                rightSection={<IconChevronDown size={14} stroke={1.5} />}
                                pointer
                            >
                                <option
                                    defaultValue={0}
                                    selected
                                >
                                    Selecione o produto
                                </option>
                                {produtos.map((produto) => (
                                    <option key={produto?.id} value={produto?.id}>
                                        {produto?.nome} - {produto?.desc}
                                    </option>
                                ))}
                            </Input>
                        </Input.Wrapper>
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <Input.Wrapper label={"Lote"} required>
                            <Input
                                component="select"
                                name="estoque"
                                onChange={(e) => handleLoteChange(Number(e?.target.value))}
                                rightSection={<IconChevronDown size={14} stroke={1.5} />}
                                pointer
                            >
                                <option
                                    defaultValue=""
                                    selected
                                >
                                    Selecione o lote
                                </option>
                                {lotes?.map((lote) => (
                                    <option key={lote?.id} value={Number(lote?.id)}>
                                        {lote?.id} - {lote?.nome}:  Quantidade disponível: {lote.quantidade}
                                    </option>
                                ))}
                            </Input>
                        </Input.Wrapper>
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <NumberInput
                            name="quantidade"
                            onChange={(value) => setFormData({ ...formData, quantidade: Number(value) })}
                            value={formData.quantidade}
                            label="Nº Alunos"
                            placeholder="Nº Alunos"
                            required
                        />
                    </Grid.Col>
                </Grid>

                <Button
                    mt="md"
                    fullWidth
                    variant="gradient"
                    fs="22rem"
                    onClick={salvarLote}
                >
                    SALVAR
                </Button>
            </Modal>
        </>
    );
}