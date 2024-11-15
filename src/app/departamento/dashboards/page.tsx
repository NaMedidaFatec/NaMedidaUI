'use client'

import { Text, Box, Grid, Paper, useComputedColorScheme, Button, Select } from '@mantine/core';
import { withFormik } from 'formik';
import { AreaChart, CompositeChart } from '@mantine/charts';
import ChartCard from '../../../components/ChartCard';
import { IconCoin, IconCurrencyDollar, IconDeviceIpadDollar, IconFileTypePdf, IconLicense, IconUserExclamation } from '@tabler/icons-react';
import { DateInput } from '@mantine/dates';
import { useEffect, useState } from 'react';
import { useUpdateTitle } from '../../../hooks/useTitle';

function DepartamentoDashboards(props: any) {

    const [filter, setFilter] = useState({ produtos: [], dataInicial: '2024-01-01', dataFinal: '2024-12-12' });
    const [filter2, setFilter2] = useState({ produtos: [], dataInicial: '2024-01-01', dataFinal: '2024-12-12' });

    const updateTitle = useUpdateTitle();

    useEffect(() => {
        updateTitle('Dashboards')
    }, [])

    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    const data = [
        {
            date: 'Mar 22',
            Apples: 110,
        },
        {
            date: 'Mar 23',
            Apples: 60,
        },
        {
            date: 'Mar 24',
            Apples: 80,
        },
        {
            date: 'Mar 25',
            Apples: null,
        },
        {
            date: 'Mar 26',
            Apples: null,
        },
        {
            date: 'Mar 27',
            Apples: 40,
        },
        {
            date: 'Mar 28',
            Apples: 120,
        },
        {
            date: 'Mar 29',
            Apples: 80,
        },
    ];

    const data2 = [
        {
            date: 'Mar 22',
            Apples: 2890,
            Oranges: 2338,
            Tomatoes: 2452,
        },
        {
            date: 'Mar 23',
            Apples: 2756,
            Oranges: 2103,
            Tomatoes: 2402,
        },
        {
            date: 'Mar 24',
            Apples: 3322,
            Oranges: 986,
            Tomatoes: 1821,
        },
        {
            date: 'Mar 25',
            Apples: 3470,
            Oranges: 2108,
            Tomatoes: 2809,
        },
        {
            date: 'Mar 26',
            Apples: 3129,
            Oranges: 1726,
            Tomatoes: 2290,
        },
    ];

    const cards = [
        { titulo: "Consumo do mês", valorAtual: '53k', valorAnterior: 1200, porcentagem: '34%', icon: IconLicense },
        { titulo: "Gasto do mês", valorAtual: '80k', valorAnterior: 1200, porcentagem: '47%', icon: IconDeviceIpadDollar },
        { titulo: "Requisições escolares", valorAtual: 142, valorAnterior: 122, porcentagem: '50%', icon: IconUserExclamation }
    ]

    return (
        <Box
            w='100%'
            h="89vh"
            display='flex'
            style={{ flexDirection: 'column' }}>

            <Grid h='auto' mt='xl'>
                {cards.map((card) => (
                    <Grid.Col span={4} key={card.titulo} mah='15rem'>
                        <ChartCard
                            titulo={card?.titulo}
                            valorAtual={card?.valorAtual}
                            valorAnterior={card?.valorAnterior}
                            porcentagem={card?.porcentagem}
                            Icon={card?.icon} />
                    </Grid.Col>
                ))}
            </Grid>

            <Paper
                h='auto'
                shadow="md"
                radius="lg"
                mt="md"
                bg={computedColorScheme == "dark" ? 'var(--mantine-color-dark-5)' : '#fff'}>

                <Box h='8%' mt='1rem'>
                    <Grid px='1.5rem'>
                        <Grid.Col span={6}>
                            <Select
                                label="Escola"
                                placeholder="Escola"
                                data={['React', 'Angular', 'Vue', 'Svelte']}
                            />
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

                    <AreaChart
                        h={400}
                        data={data}
                        p='1.5rem'
                        dataKey="date"
                        series={[{ name: 'Apples', color: 'indigo.6' }]}
                        curveType="linear"
                        connectNulls
                    />
                </Box>
            </Paper>

            <Paper
                h='auto'
                shadow="md"
                radius="lg"
                mt="md"
                bg={computedColorScheme == "dark" ? 'var(--mantine-color-dark-5)' : '#fff'}>

                <Box h='8%' mt='1rem'>
                    <Grid px='1.5rem'>
                        <Grid.Col span={6}>
                            <Select
                                label="Produtos"
                                placeholder="Arroz"
                                data={['React', 'Angular', 'Vue', 'Svelte']}
                            />
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

                    <CompositeChart
                        h={300}
                        data={data2}
                        p='1.5rem'
                        dataKey="date"
                        maxBarWidth={30}
                        series={[
                            { name: 'Tomatoes', color: 'rgba(18, 120, 255, 0.2)', type: 'bar' },
                            { name: 'Apples', color: 'red.8', type: 'line' },
                            { name: 'Oranges', color: 'yellow.8', type: 'area' },
                        ]}
                    />
                </Box>
            </Paper>

            <Box
                display='flex'
                h="2.5rem"
                my='xl'
            >
                {/* <Button
                    variant="gradient"
                    size='lg'
                    fullWidth
                    leftSection={<IconFileTypePdf size={23} />}>
                    Gerar relatório
                </Button> */}

            </Box>

            <div style={{ minHeight: '.3rem' }} />
        </Box>
    );
};

export default withFormik({
    validateOnChange: false,
    validateOnBlur: false,
    handleSubmit: () => 1
})(DepartamentoDashboards);