'use client'

import { Box, Select, Grid } from '@mantine/core';
import { Button } from '../../../components/general';
import { IconFileInfo, IconPackageImport } from "@tabler/icons-react";
import DataTable from '../../../components/general/DataTable';
import ClearableInput from '../../../components/general/ClearableInput';
import { withFormik } from 'formik';
import { useUpdateTitle } from '../../../hooks/useTitle';
import { useEffect } from 'react';
import ModalEntradaEstoque from '../../../components/Modals/ModalEntradaEstoque';
import { useDisclosure } from '@mantine/hooks';

function DepartamentoEstoque(props: any) {

    const updateTitle = useUpdateTitle();

    useEffect(() => {
        updateTitle('Estoque')
    }, [])

    const [opened, { open, close }] = useDisclosure(false);

    const tableHeaders = ["CÓDIGO", "PRODUTO", "CATEGORIA", "EM ESTOQUE"];

    const elements = [
        { id: 1, produto: 'Arroz', categoria: 'Grãos', estoque: 5 },
        { id: 2, produto: 'Feijão', categoria: "Grãos", estoque: 6 },
        { id: 3, produto: 'Banana', categoria: "Frutas", estoque: 200 },
        { id: 4, produto: 'Laranja', categoria: "Frutas", estoque: 600 },
    ];

    const additionalButtons = [
        { id: 1, icon: <IconFileInfo />, onClick: () => 1 },
    ];

    return (
        <>
            <ModalEntradaEstoque open={opened} close={close} />
            <Box
                w='100%'
                h="89vh"
                display='flex'
                style={{ flexDirection: 'column' }}>


                <Grid h='auto' mt='1rem'>
                    <Grid.Col span={5}>
                        <ClearableInput placeholder="Pesquisar" label='Pesquisar' />
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Select
                            placeholder="Categoria" label='Categoria'
                            data={['React', 'Angular', 'Vue', 'Svelte']}
                        />
                    </Grid.Col>
                    <Grid.Col span={4} display='flex' style={{ justifyContent: 'flex-end' }}>
                        <Button h='4rem' w='4rem' variant="gradient" onClick={open} style={{ borderRadius: '10rem' }}>
                            <IconPackageImport size={23} />
                        </Button>
                    </Grid.Col>
                </Grid>

                <DataTable headerElements={tableHeaders} elements={elements} />

            </Box>
        </>
    );
};

export default withFormik({
    validateOnChange: false,
    validateOnBlur: false,
    handleSubmit: () => 1
})(DepartamentoEstoque);