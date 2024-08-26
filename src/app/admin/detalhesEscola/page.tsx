'use client'

import { AppShell, CloseButton, Pagination, Table, Input, Text } from '@mantine/core';
import AppBar from '../../../components/AppBar';
import NavBar from '../../../components/NavBar';
import { Container } from '../../../components/general';
import { useState } from 'react';

export default function DetalhesEscola(props: any) {
    const [value, setValue] = useState('Clear me');

    const elements = [
        { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
        { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
        { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
        { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
        { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
    ];

    const rows = elements.map((element) => (
        <Table.Tr key={element.name}>
            <Table.Td>{element.position}</Table.Td>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.symbol}</Table.Td>
            <Table.Td>{element.mass}</Table.Td>
        </Table.Tr>
    ));

    return (
        <AppShell
            header={{ height: { base: 60, md: 70, lg: 80 } }}
            navbar={{
                width: { base: 100, md: 200, lg: 300 },
                breakpoint: 'sm',
                //collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppBar />

            <NavBar />

            <AppShell.Main display='flex'
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Container w='80%'>
                    <Text size="xl">ESCOLAS</Text>
                    <Input
                        placeholder="Clearable input"
                        value={'PESQUISAR'}
                        onChange={(event) => setValue(event.currentTarget.value)}
                        rightSectionPointerEvents="all"
                        mt="md"
                        rightSection={
                            <CloseButton
                                aria-label="Clear input"
                                onClick={() => setValue('')}
                                style={{ display: value ? undefined : 'none' }}
                            />
                        }
                    />
                    <Table stickyHeader stickyHeaderOffset={60}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Element position</Table.Th>
                                <Table.Th>Element name</Table.Th>
                                <Table.Th>Symbol</Table.Th>
                                <Table.Th>Atomic mass</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                    <Pagination total={10} size="sm" />
                </Container>

            </AppShell.Main>

        </AppShell>
    );
};
