'use client'

import { Box, Select, Grid } from '@mantine/core';
import { Button } from '../../../components/general';
import { IconFileInfo, IconFilePencil, IconPackageImport } from "@tabler/icons-react";
import DataTable from '../../../components/general/DataTable';
import ClearableInput from '../../../components/general/ClearableInput';
import { withFormik } from 'formik';
import { useUpdateTitle } from '../../../hooks/useTitle';
import { useEffect, useState } from 'react';
import ModalEntradaEstoque from '../../../components/Modals/ModalEntradaEstoque';
import { useDisclosure } from '@mantine/hooks';
import ModalCadastroLote from '../../../components/Modals/ModalCadastroLote';
import LoteService from '../../../services/departamento/estoque/lotes';
import { notifications } from '@mantine/notifications';

function DepartamentoEstoque(props: any) {

    const updateTitle = useUpdateTitle();

    useEffect(() => {
        updateTitle('Estoque')
        fetchLotes();
    }, [])

    const [lotes, setLotes] = useState([]);

    const [openedLote, handlers] = useDisclosure(false);
    const [opened, { open, close }] = useDisclosure(false);


    const fetchLotes = async () => {
        try {
            const listaLotes = await LoteService.fetchAll();
            setLotes(listaLotes?.content?.map((lote) => ({
                id: lote?.id,
                nome: lote?.nome,
                dataFabricacao: lote?.dataFabricacao,
                dataValidade: lote?.dataValidade,
                quantidade: lote?.quantidade,
                produto: lote?.produto?.id
            })));
        } catch (error) {
            console.error(error?.message);
            notifications.show({ title: 'Erro ao buscar lotes!', message: error?.message, position: 'bottom-left', color: 'red' })
        }
    }

    const tableHeaders = ["CÓD", "NOME LOTE", "DATA FABRICAÇÃO", "DATA VALIDADE", "QTD. DISPONÍVEL"];

    return (
        <>
            <ModalCadastroLote open={openedLote} close={handlers.close} fetchLotes={fetchLotes} />

            <ModalEntradaEstoque open={opened} close={close} fetchLotes={fetchLotes} />

            <Box
                w='100%'
                h="89vh"
                display='flex'
                style={{ flexDirection: 'column' }}>


                <Grid h='auto' mt='1rem'>
                    <Grid.Col span={8}>
                        <ClearableInput placeholder="Pesquisar" label='Pesquisar' />
                    </Grid.Col>
                    <Grid.Col
                        span={2}
                        display='flex'
                        style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Button variant="gradient" fullWidth onClick={handlers?.open}>
                            NOVO LOTE
                        </Button>
                    </Grid.Col>
                    <Grid.Col
                        span={2}
                        display='flex'
                        style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Button variant="gradient" fullWidth onClick={open}>
                            ENTRADA EM LOTE
                        </Button>
                    </Grid.Col>
                </Grid>

                <DataTable
                    headerElements={tableHeaders}
                    elements={lotes.map((lote) => ({
                        id: lote?.id,
                        nome: lote?.nome,
                        dataFabricacao: lote?.dataFabricacao,
                        dataValidade: lote?.dataValidade,
                        quantidade: lote?.quantidade,
                    }))}
                />

            </Box>
        </>
    );
};

export default withFormik({
    validateOnChange: false,
    validateOnBlur: false,
    handleSubmit: () => 1
})(DepartamentoEstoque);