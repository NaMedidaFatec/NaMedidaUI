import { Button, Table } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";

export default ({ headerElements, elements }) => {
    // EXEMPLO DE ELEMENTOS, podem ser adicionados mais ou menos propriedades
    // const elements = [
    //     { name: 'Turma 1', qtdAlunos: 20, nivel: 'medio', periodo: 'vespertino' },
    //     { name: 'Turma 2', qtdAlunos: 20, nivel: 'fundamental', periodo: 'vespertino' },
    //     { name: 'Turma 3', qtdAlunos: 20, nivel: 'medio', periodo: 'vespertino' },
    //     { name: 'Turma 4', qtdAlunos: 20, nivel: 'medio', periodo: 'matutino' },
    // ];

    // EXEMPLO DE ELEMENTOS DE HEADER (array de strings)
    // const headerElements = [ "receba", "graçasaDeus" ];

    const keys = elements.length > 0 ? Object.keys(elements[0]) : [];
    const headerKeys = headerElements.length > 0 ? headerElements : [];

    const rows = elements.map((element, index) => (
        <Table.Tr key={index}>
            {keys.map((key) => (
                <Table.Td key={key}>{element[key]}</Table.Td>
            ))}
            <Table.Td display='flex' style={{ justifyContent: 'end' }}>
                <Button
                    variant="light"
                    onClick={() => console.log('Button clicked')}
                >
                    <IconDots />
                </Button>
            </Table.Td>
        </Table.Tr>
    ));

    const headers = (
        <Table.Tr>
            {headerKeys.map((titulo) => (
                <Table.Th key={titulo}>{titulo}</Table.Th>
            ))}
        </Table.Tr>
    );

    return (
        <>
            <Table
                stickyHeader
                stickyHeaderOffset={60}
                verticalSpacing='sm'
                striped
                highlightOnHover
                withRowBorders={false}
                horizontalSpacing="xl" >
                <Table.Thead>
                    {headers}
                </Table.Thead>
                <Table.Tbody mah='10%'>
                    {rows}
                </Table.Tbody>
            </Table>
        </>
    );
};