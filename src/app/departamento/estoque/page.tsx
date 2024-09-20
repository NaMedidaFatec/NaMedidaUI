'use client'

import { Pagination, Table, Text, Box, Select, Grid } from '@mantine/core';
import { Button } from '../../../components/general';
import { IconDots, IconPackageImport } from "@tabler/icons-react";
import DataTable from '../../../components/general/DataTable';
import ClearableInput from '../../../components/general/ClearableInput';
import { withFormik } from 'formik';

function DetalhesEscola(props: any) {

    const tableHeaders = ["PRODUTO", "CATEGORIA", "EM ESTOQUE"];

    const elements = [
        { produto: 'Arroz', categoria: 'Grãos', estoque: 5 },
        { produto: 'Feijão', categoria: "Grãos", estoque: 6 },
        { produto: 'Banana', categoria: "Frutas", estoque: 200 },
        { produto: 'Laranja', categoria: "Frutas", estoque: 600 },
    ];

    const rows = elements.map((element) => (
        <Table.Tr key={element.produto}>
            <Table.Td>{element.produto}</Table.Td>
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


            <Grid h='8%' mt='1rem'>
                <Grid.Col span={6}>
                    <Text
                        size="2rem"
                        fw={700}
                        variant="gradient"
                        gradient={{ from: '#e67d22', to: 'white', deg: 72 }}
                    >
                        Estoque
                    </Text>
                </Grid.Col>

                <Grid.Col span={6} display='flex' style={{ justifyContent: 'end' }}>
                    <Button leftSection={<IconPackageImport size={20} />}>Entrada </Button>
                </Grid.Col>
            </Grid>

            <Grid h='7%'>
                <Grid.Col span={8}>
                    <ClearableInput placeholder="Pesquisar" />
                </Grid.Col>
                <Grid.Col span={4}>
                    <Select
                        placeholder="Categoria"
                        data={['React', 'Angular', 'Vue', 'Svelte']}
                    />
                </Grid.Col>
            </Grid>

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
})(DetalhesEscola);