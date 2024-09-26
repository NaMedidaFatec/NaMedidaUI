'use client'

import { Text, Box, Grid, Paper, useComputedColorScheme, Button } from '@mantine/core';
import { withFormik } from 'formik';
import { AreaChart } from '@mantine/charts';
import ChartCard from '../../../components/ChartCard';
import { IconCoin, IconCurrencyDollar, IconDeviceIpadDollar, IconFileTypePdf, IconLicense, IconUserExclamation } from '@tabler/icons-react';
import { DateInput } from '@mantine/dates';
import { useState } from 'react';

function DepartamentoDashboards(props: any) {

    const [filter, setFilter] = useState({ produtos: [], dataInicial: '2024-01-01', dataFinal: '2024-12-12' });
    const [filter2, setFilter2] = useState({ produtos: [], dataInicial: '2024-01-01', dataFinal: '2024-12-12' });


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

            <Grid h='8%' mt='1rem'>
                <Grid.Col span={6}>
                    <Text
                        size="2rem"
                        fw={700}
                        variant="gradient"
                        gradient={{ from: '#e67d22', to: 'white', deg: 72 }}
                    >
                        Dashboards
                    </Text>
                </Grid.Col>

                <Grid.Col span={6} display='flex' style={{ justifyContent: 'end' }}>
                    <Button variant='light' leftSection={<IconFileTypePdf size={23} />}>Gerar relatório</Button>
                </Grid.Col>
            </Grid>

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

                <Grid h='8%' mt='1rem'>
                    <Grid.Col span={2} py='1.5rem' pl='1.5rem' >
                        <DateInput
                            onChange={() => 1}
                            label="Data inicial"
                            placeholder={filter.dataInicial}
                        />
                        <DateInput
                            onChange={() => 1}
                            label="Data inicial"
                            placeholder={filter.dataInicial}
                        />
                    </Grid.Col>
                    <Grid.Col span={10}>
                        <AreaChart
                            h={400}
                            data={data}
                            py='1.5rem'
                            pr='1.5rem'
                            dataKey="date"
                            series={[{ name: 'Apples', color: 'indigo.6' }]}
                            curveType="linear"
                            connectNulls
                        />
                    </Grid.Col>
                </Grid>
            </Paper>

            <Paper
                h='auto'
                shadow="md"
                radius="lg"
                mt="md"
                bg={computedColorScheme == "dark" ? 'var(--mantine-color-dark-5)' : '#fff'}>

                <Grid h='8%' mt='1rem'>
                    <Grid.Col span={2} py='1.5rem' pl='1.5rem'>
                        <DateInput
                            onChange={() => 1}
                            label="Data inicial"
                            placeholder={filter.dataInicial}
                        />
                        <DateInput
                            onChange={() => 1}
                            label="Data inicial"
                            placeholder={filter.dataInicial}
                        />
                    </Grid.Col>
                    <Grid.Col span={10}>
                        <AreaChart
                            h={400}
                            data={data2}
                            dataKey="date"
                            p='1.5rem'
                            pr='1.5rem'
                            type='stacked'
                            series={[
                                { name: 'Apples', color: 'indigo.6' },
                                { name: 'Oranges', color: 'blue.6' },
                                { name: 'Tomatoes', color: 'teal.6' },
                            ]}
                            curveType="linear"
                        />
                    </Grid.Col>
                </Grid>
            </Paper>

            <Box mih="1.5rem" />
        </Box>
    );
};

export default withFormik({
    validateOnChange: false,
    validateOnBlur: false,
    handleSubmit: () => 1
})(DepartamentoDashboards);