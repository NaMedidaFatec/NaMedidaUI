'use client'

import { Box, Select, Grid } from '@mantine/core';
import { Button } from '../../../components/general';
import DataTable from '../../../components/general/DataTable';
import ClearableInput from '../../../components/general/ClearableInput';
import { withFormik } from 'formik';
import { useUpdateTitle } from '../../../hooks/useTitle';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import ModalCadastroProduto from '../../../components/Modals/ModalCadastroProduto';
import ProdutoService from '../../../services/departamento/estoque/produto';
import { notifications } from '@mantine/notifications';
import ModalCadastroLote from '../../../components/Modals/ModalCadastroLote';

function DepartamentoProdutos(props: any) {
    const [produtos, setProdutos] = useState([]);
    const [searchField, setSearchField] = useState("");
    const [selectedProduto, setSelectedProduto] = useState({});
    const [filteredProdutos, setFilteredProdutos] = useState([]);

    const [openedProduto, { open, close }] = useDisclosure(false);
    const [openedLote, handlers] = useDisclosure(false);

    const updateTitle = useUpdateTitle();

    useEffect(() => {
        updateTitle('Produtos')
        fetchProdutos();
    }, [])

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
            regex.test(item.codigoDeBarras) ||
            regex.test(item.quantidadeEstoque)
        );
    };

    const tableHeaders = ["CÓDIGO", "PRODUTO", "COD. BARRAS", "QTD. ESTOQUE", "ATIVO?"];

    const fetchProdutos = async () => {
        const produtos = await ProdutoService.fetchAll();
        const produtosList = produtos?.content?.map(produto => ({
            id: produto?.id,
            nome: produto?.nome,
            codigoDeBarras: produto?.codigoDeBarras,
            quantidadeEstoque: produto?.quantidadeEstoque,
            ativo: produto?.enabled
        }));

        setProdutos(produtosList);
        setFilteredProdutos(produtosList);
    };

    const toggleActivationFunction = async (element: any) => {
        try {
            await ProdutoService.toggleStatusProduto(element?.id).then(
                fetchProdutos
            );
        } catch (error) {
            console.log(error?.message);
            notifications.show({ title: 'Erro ao desativar!', message: error?.message, position: 'bottom-left', color: 'red' })
        }
    };

    return (
        <>
            <ModalCadastroProduto open={openedProduto} close={close} />

            <ModalCadastroLote open={openedLote} close={handlers.close} />

            <Box
                w='100%'
                h="89vh"
                display='flex'
                style={{ flexDirection: 'column' }}>


                <Grid h='auto' mt='1rem'>
                    <Grid.Col span={8}>
                        <ClearableInput
                            placeholder="Pesquisar"
                            label='Pesquisar'
                            value={searchField}
                            setValue={setSearchField}
                        />
                    </Grid.Col>
                    <Grid.Col
                        span={2}
                        display='flex'
                        style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Button variant="gradient" fullWidth onClick={open}>
                            NOVO PRODUTO
                        </Button>
                    </Grid.Col>
                    <Grid.Col
                        span={2}
                        display='flex'
                        style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Button variant="gradient" fullWidth onClick={handlers?.open}>
                            NOVO LOTE
                        </Button>
                    </Grid.Col>
                </Grid>

                <DataTable
                    headerElements={tableHeaders}
                    elements={filteredProdutos} 
                    activate
                    toggleActivationFunction={toggleActivationFunction}/>

            </Box>
        </>
    );
};

export default withFormik({
    validateOnChange: false,
    validateOnBlur: false,
    handleSubmit: () => 1
})(DepartamentoProdutos);