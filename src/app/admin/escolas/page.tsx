'use client'

import { CloseButton, Pagination, Table, Input, Text, Box } from '@mantine/core';
import { useState } from 'react';
import { Button } from '../../../components/general';
import { IconDots } from "@tabler/icons-react";

export default function DetalhesEscola(props: any) {
    const [value, setValue] = useState('Clear me');

    const elements = [
        { name: 'Escola 1' },
        { name: 'Escola 2' },
        { name: 'Escola 3' },
        { name: 'Escola 4' },
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

            <Box h='15%'>
                <Text size="xl" mb="md">ESCOLAS</Text>
                <Input
                    placeholder="Clearable input"
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                    rightSectionPointerEvents="all"
                    pt='1rem'
                    rightSection={
                        <CloseButton
                            aria-label="Clear input"
                            onClick={() => setValue('')}
                            style={{ display: value ? undefined : 'none' }}
                        />
                    }
                />
            </Box>

            <Box h='80%'>
                <Table
                    stickyHeader
                    stickyHeaderOffset={60}
                    verticalSpacing='sm'
                    striped
                    highlightOnHover 
                    withRowBorders={false} 
                    horizontalSpacing="xl" >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Nome da Escola</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody mah='10%'>
                        {rows}
                    </Table.Tbody>
                </Table>
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
