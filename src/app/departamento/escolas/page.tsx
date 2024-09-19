'use client'

import { Pagination, Table, Text, Box } from '@mantine/core';
import { Button } from '../../../components/general';
import { IconDots } from "@tabler/icons-react";
import DataTable from '../../../components/general/DataTable';
import ClearableInput from '../../../components/general/ClearableInput';
import { withFormik } from 'formik';

function DetalhesEscola(props: any) {

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

            <Box h='15%' mt='1rem'>
                <Text
                    size="2rem"
                    fw={700}
                    variant="gradient"
                    gradient={{ from: '#e67d22', to: 'white', deg: 72 }}
                >Escolas Cadastradas

                </Text>
                <ClearableInput placeholder="Pesquisar" />
            </Box>

            <Box h='80%'>
                <DataTable headerElements={tableHeaders} elements={elements} activate={true} />
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
})(DetalhesEscola);