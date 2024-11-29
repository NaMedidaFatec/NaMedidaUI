import { Badge, Box, Button, Divider, Group, Modal, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import ClearableInput from "../../general/ClearableInput";
import DataTable from "../../general/DataTable";
import ProdutoService from "../../../services/departamento/estoque/produto";
import EscolaService from "../../../services/escola";

interface ComponentProps {
    open?: boolean;
    close?: () => void;
    fetchRefeicoes?: () => void;
    refeicaoId?: number;
}

export default function ModalCadastroRefeicaoItens({ open, close, refeicaoId, fetchRefeicoes }: ComponentProps) {
    const [selectedItemsList, setSelectedItemsList] = useState([]);

    const [produtos, setProdutos] = useState([]);
    const [filteredProdutos, setFilteredProdutos] = useState([]);
    const [searchField, setSearchField] = useState("");

    useEffect(() => {
        fetchProdutos();
        setSelectedItemsList([])
    }, [open]);

    useEffect(() => {
        search();
    }, [searchField])

    const search = async () => {
        if (produtos && searchField) {
            const filtered = produtos.filter(filterLista);
            setFilteredProdutos(filtered);
        } else {
            setFilteredProdutos(produtos);
        }
    };

    const filterLista = (item) => {
        const regex = new RegExp(searchField, 'ig');
        return (
            regex.test(item.id) ||
            regex.test(item.nome) ||
            regex.test(item.quantidadeEstoque)
        );
    };

    const fetchProdutos = async () => {
        try {
            const produtos = await ProdutoService.fetchAll();
            const produtosList = produtos?.content?.map(produto => ({
                id: produto?.id,
                nome: produto?.nome,
                quantidadeEstoque: produto?.quantidadeEstoque,
                quantidade: 0,
            }));
            setProdutos(produtosList);
            setFilteredProdutos(produtosList);
        } catch (error) {
            console.error(error?.message)
        }
    }

    const saveRequisicaoItens = async () => {
        try {
            const itemListWithoutName = selectedItemsList?.map(item => ({
                produto: item?.produto,
                refeicao: item?.refeicao,
                quantidade: item?.quantidade,
            }))

            for (const item of itemListWithoutName) {
                await EscolaService.createRefeicaoItens(item);
            }
            notifications.show({ title: 'Salvo com sucesso', message: '', position: 'bottom-left', color: 'blue' });
            setTimeout(() => {
                fetchRefeicoes();
            }, 750);
            close();
        } catch (error) {
            console.log(error);
            notifications.show({ title: 'Erro ao salvar itens', message: error?.message, position: 'bottom-left', color: 'red' });
        }
    };

    const selecionarItem = (element: any) => {
        const itemAlreadyExists = selectedItemsList.find(item => item?.produto === element?.id);

        if (itemAlreadyExists) {
            notifications.show({ title: 'Erro ao adicionar item', message: 'Item já selecionado', position: 'bottom-left', color: 'red' });
            return;
        }

        if (element?.quantidade === 0) {
            notifications.show({ title: 'Erro ao adicionar item', message: 'Quantidade não pode ser igual a 0', position: 'bottom-left', color: 'red' });
            return;
        }

        if (element?.quantidade > element?.quantidadeEstoque) {
            notifications.show({ title: 'Erro ao adicionar item', message: 'Quantidade não pode ser maior que a disponível', position: 'bottom-left', color: 'red' });
            return;
        }

        const newItem = {
            nome: element?.nome,
            quantidade: element?.quantidade,
            produto: element?.id,
            refeicao: refeicaoId,
        };

        setSelectedItemsList(prevState => [...prevState, newItem]);
    };

    const handleQuantidadeChange = (id: any, newQuantidade: any) => {
        setFilteredProdutos((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, quantidade: newQuantidade } : item
            )
        );
    };

    const tableHeaders = ["CÓD", "PRODUTO", "DISPONÍVEL", "QUANTIDADE"];

    const additionalButtons = [
        { id: 1, icon: "SELECIONAR", onClick: (element: any) => selecionarItem(element) },
    ];

    return (
        <>
            <Modal
                opened={open}
                onClose={close}
                centered
                size="70vw"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                title={
                    <Text size="xl" fw={200}>
                        Selecione itens que compoem refeição
                    </Text>}
            >
                <Divider size="xs" />

                <Box my='md'>
                    <ClearableInput
                        placeholder="Pesquisar"
                        label='Pesquisar'
                        value={searchField}
                        setValue={setSearchField}
                    />
                </Box>

                <Group wrap="nowrap" mt="md">
                    {selectedItemsList.map((item) =>
                        <div key={item?.id}>
                            <Badge>
                                {item?.nome}{' '}{item?.quantidade}
                            </Badge>
                        </div>
                    )}
                </Group>

                <DataTable
                    headerElements={tableHeaders}
                    elements={filteredProdutos.filter((produto) => produto?.quantidadeEstoque > 0)}
                    stripped={false}
                    withRowBorders
                    withBgColor={false}
                    editableQuantity
                    withTableBorder
                    additionalButtons={additionalButtons}
                    handleQuantidadeChange={handleQuantidadeChange}
                />

                <Box mt='md' display="flex" style={{ justifyContent: "flex-end" }}>
                    <Button size="md" variant="gradient" onClick={saveRequisicaoItens}>
                        Adicionar Itens
                    </Button>
                </Box>

            </Modal>
        </>
    );
}