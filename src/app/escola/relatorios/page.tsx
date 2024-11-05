'use client'

import { Pagination, Text, Box, Button, Grid, Paper, useComputedColorScheme } from '@mantine/core';
import DataTable from '../../../components/general/DataTable';
import ClearableInput from '../../../components/general/ClearableInput';
import { withFormik } from 'formik';
import { IconFileInfo, IconUpload } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { DateInput } from '@mantine/dates';
import { useUpdateTitle } from '../../../hooks/useTitle';
import { useDisclosure } from '@mantine/hooks';
import ModalDropzone from '../../../components/Modals/ModalDropzone';

function RelatoriosEscola(props: any) {

    const updateTitle = useUpdateTitle();

    useEffect(() => {
        updateTitle('Meus Relatórios')
    }, [])

    const [opened, { open, close }] = useDisclosure(false);

    const [filter, setFilter] = useState({ codigo: 1, dataInicial: '2024-01-01', dataFinal: '2024-12-12' });

    const tableHeaders = ["Código", "Status", "Data de envio"];

    const elements = [
        { codigo: 1, status: 'ENVIADO', dtEnvio: '23/02/2024' },
        { codigo: 2, status: 'EM ANÁLISE', dtEnvio: '22/02/2024' },
        { codigo: 3, status: 'EM ANÁLISE', dtEnvio: '22/02/2024' },
        { codigo: 4, status: 'ENVIADO', dtEnvio: '24/06/2024' },
        { codigo: 5, status: 'ENVIADO', dtEnvio: '23/02/2024' },
        { codigo: 6, status: 'EM ANÁLISE', dtEnvio: '22/02/2024' },
        { codigo: 7, status: 'EM ANÁLISE', dtEnvio: '22/02/2024' },
        { codigo: 8, status: 'ENVIADO', dtEnvio: '24/06/2024' },
        { codigo: 9, status: 'ENVIADO', dtEnvio: '23/02/2024' },
    ];

    const additionalButtons = [
        { id: 1, icon: <IconFileInfo />, onClick: () => 1 },
    ];

    return (
        <>
            <ModalDropzone open={opened} close={close}/>
            
            <Box
                w='100%'
                h="89vh"
                display='flex'
                style={{ flexDirection: 'column' }}>

                <Grid h='auto' mt='1rem'>
                    <Grid.Col span={3}>
                        <ClearableInput placeholder="Código" label="Código" />
                    </Grid.Col>

                    <Grid.Col span={2}>
                        <DateInput
                            onChange={() => 1}
                            label="Data inicial"
                            placeholder={filter.dataInicial}
                        />
                    </Grid.Col>

                    <Grid.Col span={2}>
                        <DateInput
                            onChange={() => 1}
                            label="Data final"
                            placeholder={filter.dataFinal}
                        />
                    </Grid.Col>

                    <Grid.Col span={5} display='flex' style={{ justifyContent: 'end' }}>
                        <Button h='4rem' w='4rem' variant="gradient" onClick={open} style={{ borderRadius: '10rem' }}>
                            <IconUpload size={23} />
                        </Button>
                    </Grid.Col>
                </Grid>

                <DataTable headerElements={tableHeaders} elements={elements} additionalButtons={additionalButtons} />

            </Box>
        </>
    );
};

export default withFormik({
    validateOnChange: false,
    validateOnBlur: false,
    handleSubmit: () => 1
})(RelatoriosEscola);