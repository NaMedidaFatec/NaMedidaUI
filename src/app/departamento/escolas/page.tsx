'use client'

import { Pagination, Table, Box, Paper, useComputedColorScheme } from '@mantine/core';
import { Button } from '../../../components/general';
import { IconDots } from "@tabler/icons-react";
import DataTable from '../../../components/general/DataTable';
import ClearableInput from '../../../components/general/ClearableInput';
import { withFormik } from 'formik';
import { useUpdateTitle } from '../../../hooks/useTitle';
import { useEffect } from 'react';

function DetalhesEscola(props: any) {

    const updateTitle = useUpdateTitle();

    useEffect(() => {
        updateTitle('Escolas Cadastradas')
    }, [])

    const tableHeaders = ["NOME DA ESCOLA", 'STATUS'];

    const elements = [
        { name: 'Escola Municipal Professor Eulalio Gruppi', ativo: true },
        { name: 'Escola 2', ativo: true },
        { name: 'Escola 3', ativo: false },
        { name: 'Escola 4', ativo: true },
    ];

    const rows = elements.map((element) => (
        <Table.Tr key={element.name}>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td display='flex' style={{ justifyContent: 'end' }}>
                <Button
                    variant="light"
                    onClick={() => 1}
                >
                    <IconDots />
                </Button>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Box
            w='100%'
            h="89vh"
            display='flex'
            style={{ flexDirection: 'column' }}>

            <Box h='8%' mt='1rem'>
                <ClearableInput placeholder="Pesquisar" label='Pesquisar' />
            </Box>

            <DataTable headerElements={tableHeaders} elements={elements} activate detalheEscola/>

        </Box>
    );
};

export default withFormik({
    validateOnChange: false,
    validateOnBlur: false,
    handleSubmit: () => 1
})(DetalhesEscola);