import { Button, Table, Text, useComputedColorScheme } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { useState } from "react";

interface Element {
    [key: string]: any;
}

interface MyComponentProps {
    headerElements: string[];
    elements: Element[];
    additionalButtons?: Element[];
    activate?: boolean;
}
// EXEMPLO DE ELEMENTOS DE HEADER (array de strings)
// const headerElements = [ "receba", "graçasaDeus" ];

// EXEMPLO DE ELEMENTOS, podem ser adicionados mais ou menos propriedades
// const elements = [
//     { name: 'Turma 1', qtdAlunos: 20, nivel: 'medio', periodo: 'vespertino' },
//     { name: 'Turma 2', qtdAlunos: 20, nivel: 'fundamental', periodo: 'vespertino' },
//     { name: 'Turma 3', qtdAlunos: 20, nivel: 'medio', periodo: 'vespertino' },
//     { name: 'Turma 4', qtdAlunos: 20, nivel: 'medio', periodo: 'matutino' },
// ];

// EXEMPLO DE BOTÕES ADICIONAIs
//    const additionalButtons = [
//    { id: 1, icon: "DETALHES" , onClick: () => 1 },
//    { id: 2, icon: <Icon123/> , onClick: () => 1 },
//];
// SE O ARRAY TIVER UMA PROPRIEDADE CHAMADA "ativo" COM BOOLEANS, SERÁ AUTOMATICAMENTE CONVERTIDO NA TABELA PARA "ATIVO" "INATIVO"
// SE TIVER A PROP "activate" COMO TRUE, SERÁ CRIADA UMA COLUNA NA TABELA PARA BOTÕES ATIVAR/DESATIVAR

const DataTable: React.FC<MyComponentProps> = ({
    headerElements,
    elements,
    additionalButtons = undefined,
    activate = false,
}) => {
    
    const keys = elements.length > 0 ? Object.keys(elements[0]) : [];
    const headerKeys = headerElements.length > 0 ? headerElements : [];

    const headers = (
        <Table.Tr >
            {headerKeys.map((titulo) => (
                <Table.Th key={titulo} >
                    <Text truncate="end" size="lg" lineClamp={2} fw={700}>
                        {titulo}
                    </Text>
                </Table.Th>
            ))}
        </Table.Tr>
    );

    const rows = elements.map((element, index) => (
        <Table.Tr key={index} maw="100%">
            {keys.map((key) => (
                <Table.Td key={key}>
                    <Text truncate="end" size="md" lineClamp={2}>
                        {key === "ativo" ? (
                            typeof element[key] === "boolean" ? (
                                element[key] ? "ATIVO" : "INATIVO"
                            ) : (
                                String(element[key])
                            )
                        ) : (
                            element[key]
                        )}
                    </Text>
                </Table.Td>
            ))}
            <Table.Td style={{ display: 'flex', justifyContent: 'end' }}>
                {additionalButtons?.map((button) =>
                    <Button
                        key={button?.id}
                        ml="1.5rem"
                        variant="light"
                        onClick={button?.onClick}
                    >
                        {button?.icon}
                    </Button>
                )}
                {activate && (
                    <Button
                        variant="light"
                        color="red"
                        miw='8rem'
                        onClick={() => 1}
                        ml="1.5rem">
                        {element['ativo'] ? 'DESATIVAR' : 'ATIVAR'}
                    </Button>
                )}
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Table
            stickyHeader
            stickyHeaderOffset={60}
            verticalSpacing="md"
            striped
            highlightOnHover
            withRowBorders={false}
            horizontalSpacing="xl"
        >
            <Table.Thead bg='transparent'>
                {headers}
            </Table.Thead>
            <Table.Tbody mah="10%">
                {rows}
            </Table.Tbody>
        </Table>
    );
};

export default DataTable;