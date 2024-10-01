'use client'

import { Pagination, Text, Box, Button, Grid } from '@mantine/core';
import DataTable from '../../../components/general/DataTable';
import ClearableInput from '../../../components/general/ClearableInput';
import { withFormik } from 'formik';
import { IconPlus, IconUpload } from '@tabler/icons-react';
import { useState } from 'react';
import { DateInput } from '@mantine/dates';

function RelatoriosEscola(props: any) {
    const [filter, setFilter] = useState({ codigo: 1, dataInicial: '2024-01-01', dataFinal: '2024-12-12' });

    const tableHeaders = ["Código", "Status", "Data de envio"];

    const elements = [
        { codigo: 1, status: 'ENVIADO', dtEnvio: '23/02/2024' },
        { codigo: 2, status: 'EM ANÁLISE', dtEnvio: '22/02/2024' },
        { codigo: 3, status: 'EM ANÁLISE', dtEnvio: '22/02/2024' },
        { codigo: 4, status: 'ENVIADO', dtEnvio: '24/06/2024' },
    ];

    const additionalButtons = [
        { id: 1, icon: "DETALHES", onClick: () => 1 },
    ];

    return (
        <Box
            w='100%'
            h="89vh"
            display='flex'
            style={{ flexDirection: 'column' }}>

            <Grid h='8%' mt='1rem'>
                <Grid.Col span={6}>
                    <Text
                        size="2rem"
                        fw={700}
                        variant="gradient"
                        gradient={{ from: '#e67d22', to: 'white', deg: 72 }}
                    >
                        Meus Relatórios
                    </Text>
                </Grid.Col>

                <Grid.Col span={6} display='flex' style={{ justifyContent: 'end' }}>
                    <Button variant='light' leftSection={<IconUpload size={23} />}>Enviar relatório </Button>
                </Grid.Col>
            </Grid>

            <Grid h='7%' mb='1rem'>
                <Grid.Col span={6}>
                    <ClearableInput placeholder="Código" label="Código" />
                </Grid.Col>

                <Grid.Col span={3}>
                    <DateInput
                        onChange={() => 1}
                        label="Data inicial"
                        placeholder={filter.dataInicial}
                    />
                </Grid.Col>

                <Grid.Col span={3}>
                    <DateInput
                        onChange={() => 1}
                        label="Data final"
                        placeholder={filter.dataFinal}
                    />
                </Grid.Col>
            </Grid>

            <Box h='80%'>
                <DataTable headerElements={tableHeaders} elements={elements} additionalButtons={additionalButtons}/>
            </Box>

            <Box h="5%"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'end'
                }}
            >
                <Pagination total={10} size="sm" />
            </Box>
        </Box>
    );
};

export default withFormik({
    validateOnChange: false,
    validateOnBlur: false,
    handleSubmit: () => 1
})(RelatoriosEscola);