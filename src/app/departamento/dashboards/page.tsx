'use client'

import { Pagination, Table, Text, Box } from '@mantine/core';
import { Button } from '../../../components/general';
import { IconDots } from "@tabler/icons-react";
import DataTable from '../../../components/general/DataTable';
import { withFormik } from 'formik';
import { BarChart } from '@mantine/charts';
import ChartCard from '../../../components/ChartCard';

function DepartamentoDashboards(props: any) {

    const data = [
        { month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 },
        { month: 'February', Smartphones: 1900, Laptops: 1200, Tablets: 400 },
        { month: 'March', Smartphones: 400, Laptops: 1000, Tablets: 200 },
        { month: 'April', Smartphones: 1000, Laptops: 200, Tablets: 800 },
        { month: 'May', Smartphones: 800, Laptops: 1400, Tablets: 1200 },
        { month: 'June', Smartphones: 750, Laptops: 600, Tablets: 1000 },
    ];

    return (
        <Box
            w='100%'
            h="89vh"
            display='flex'
            style={{ flexDirection: 'column' }}>

            <Box h='8%' mt='1rem'>
                <Text
                    size="2rem"
                    fw={700}
                    variant="gradient"
                    gradient={{ from: '#e67d22', to: 'white', deg: 72 }}
                >
                    Dashboards
                </Text>
            </Box>

            <Box h='20%'>
                <ChartCard/>
            </Box>

            <Box h='60%'>
                <BarChart
                    h='100%'
                    data={data}
                    dataKey="month"
                    series={[
                        { name: 'Smartphones', color: 'violet.6' },
                        { name: 'Laptops', color: 'blue.6' },
                        { name: 'Tablets', color: 'teal.6' },
                    ]}
                    tickLine="y"
                />
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
})(DepartamentoDashboards);