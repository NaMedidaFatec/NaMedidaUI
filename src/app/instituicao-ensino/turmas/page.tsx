'use client'

import { Pagination, Text, Box, SimpleGrid, Button, Grid } from '@mantine/core';
import DataTable from '../../../components/general/DataTable';
import ClearableInput from '../../../components/general/ClearableInput';
import { withFormik } from 'formik';
import { IconPlus } from '@tabler/icons-react';

function DetalhesTurmas(props: any) {
    const tableHeaders = ["Turma", "Qtd Alunos", "Nível", "Período"];

    const elements = [
        { name: 'Turma 1', qtdAlunos: 20, nivel: 'medio', periodo: 'vespertino' },
        { name: 'Turma 2', qtdAlunos: 20, nivel: 'fundamental', periodo: 'vespertino' },
        { name: 'Turma 3', qtdAlunos: 20, nivel: 'medio', periodo: 'vespertino' },
        { name: 'Turma 4', qtdAlunos: 20, nivel: 'medio', periodo: 'matutino' },
    ];

    return (
        <Box
            w='100%'
            h="89vh"
            display='flex'
            style={{ flexDirection: 'column' }}>

            <Box h='15%' mt='1rem'>
                <Grid>
                    <Grid.Col span={6}>
                        <Text size="2rem">Minhas Turmas</Text>
                    </Grid.Col>

                    <Grid.Col span={6} display='flex' style={{ justifyContent: 'end' }}>
                        <Button leftSection={<IconPlus size={14} />}>Cadastrar </Button>
                    </Grid.Col>
                </Grid>

                <ClearableInput placeholder="Pesquisar" />
            </Box>

            <Box h='80%'>
                <DataTable headerElements={tableHeaders} elements={elements} />
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
})(DetalhesTurmas);