import { Box, Button, Checkbox, NumberInput, Pagination, Paper, Table, Text, useComputedColorScheme } from "@mantine/core";
import { IconFileInfo, IconUserFilled } from "@tabler/icons-react";
import { useState } from "react";

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
//    { id: 1, icon: <IconFileInfo/> , onClick: () => 1 },
//    { id: 2, icon: <Icon123/> , onClick: () => 1 },
//];
// SE O ARRAY TIVER UMA PROPRIEDADE CHAMADA "ativo" COM BOOLEANS, SERÁ AUTOMATICAMENTE CONVERTIDO NA TABELA PARA "ATIVO" "INATIVO"
// SE TIVER A PROP "activate" COMO TRUE, SERÁ CRIADA UMA COLUNA NA TABELA PARA BOTÕES ATIVAR/DESATIVAR

interface Element {
    [key: string]: any;
}

interface MyComponentProps {
    headerElements: string[];
    elements: Element[];
    activate?: boolean;
    infoButton?: boolean;
    representanteButton?: boolean;
    selection?: boolean;
    stripped?: boolean;
    withColumnBorders?: boolean;
    withRowBorders?: boolean;
    highlightOnHover?: boolean;
    withBgColor?: boolean;
    withTableBorder?: boolean;
    toggleActivationFunction?: (element: any) => Promise<void>;
    openInfoModal?: (element: any) => Promise<void>;
    openRepresentanteModal?: (element: any) => Promise<void>;
}

const DataTable: React.FC<MyComponentProps> = ({
    headerElements,
    elements,
    activate = false,
    infoButton = false,
    representanteButton = false,
    selection = false,
    stripped = true,
    withColumnBorders = false,
    withRowBorders = false,
    highlightOnHover = false,
    withBgColor = true,
    withTableBorder = false,
    toggleActivationFunction = undefined,
    openInfoModal = undefined,
    openRepresentanteModal = undefined,
}) => {

    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    const handleActivationButtonClick = (rowData: any) => {
        if (toggleActivationFunction) {
            toggleActivationFunction(rowData);
        }
    };

    const returnRowId = (rowId: any, ) => {
        openInfoModal?.(rowId);
    };
    
    const returnRowIdRepresentante = (rowId: any, ) => {
        openRepresentanteModal?.(rowId);
    };

    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const keys = elements.length > 0 ? Object.keys(elements[0]) : [];

    const headerKeys = headerElements.length > 0 ? headerElements : [];

    const headers = (
        <Table.Tr >
            {selection && (<Table.Tr />)}

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
        <Table.Tr key={index}>

            {selection && (
                <Table.Td>
                    <Checkbox
                        aria-label="Select row"
                        checked={selectedRows.includes(element.id)}
                        onChange={(event) =>
                            setSelectedRows(
                                event.currentTarget.checked
                                    ? [...selectedRows, element.id]
                                    : selectedRows.filter((position) => position !== element.id)
                            )
                        }
                    />
                </Table.Td>
            )}

            {keys.map((key) => (
                <Table.Td key={key}>
                    <Text truncate="end" size="md" lineClamp={2}>

                        {(() => {
                            switch (key) {
                                case "ativo":
                                    return typeof element[key] === "boolean"
                                        ? element[key] ? "ATIVO" : "INATIVO"
                                        : String(element[key]);
                                case "quantidade":
                                    return Number.isInteger(element[key])
                                        ? <NumberInput maw={'65%'} placeholder="Quantidade" />
                                        : String(element[key]);
                                default:
                                    return String(element[key] !== null ? element[key] : "N/A");
                            }
                        })()}

                    </Text>
                </Table.Td>
            ))}

            <Table.Td style={{ display: 'flex', justifyContent: 'end' }}>
                {representanteButton && (
                    <Button
                        variant="subtle"
                        miw='4rem'
                        radius="md"
                        onClick={() => returnRowIdRepresentante(element?.id)}
                        ml="1.5rem">
                        <IconUserFilled />
                    </Button>
                )}


                {infoButton && (
                    <Button
                        variant="subtle"
                        miw='4rem'
                        radius="md"
                        onClick={() => returnRowId(element?.id)}
                        ml="1.5rem">
                        <IconFileInfo />
                    </Button>
                )}

                {activate && (
                    <Button
                        variant="light"
                        color={element['ativo'] ? 'red' : 'blue'}
                        miw='8rem'
                        radius="md"
                        onClick={() => handleActivationButtonClick(element)}
                        ml="1.5rem">
                        {element['ativo'] ? 'DESATIVAR' : 'ATIVAR'}
                    </Button>
                )}
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <Paper
                mah='90%'
                shadow="lg"
                radius="lg"
                mt="md"
                bg={withBgColor ? (computedColorScheme === "dark" ? 'var(--mantine-color-dark-5)' : '#fff') : undefined}
            >
                <Box h='auto' mah='100%' style={{ overflowX: 'scroll' }} >
                    <Table
                        withTableBorder={withTableBorder}
                        verticalSpacing="md"
                        striped={stripped}
                        withColumnBorders={withColumnBorders}
                        withRowBorders={withRowBorders}
                        highlightOnHover={highlightOnHover}
                        horizontalSpacing="xl">
                        <Table.Thead bg='transparent'>
                            {headers}
                        </Table.Thead>
                        <Table.Tbody mah="10%">
                            {rows}
                        </Table.Tbody>
                    </Table>
                </Box>
            </Paper >

            <Box h="auto"
                display='flex'
                my='md'
                style={{
                    justifyContent: 'center',
                    alignItems: 'end'
                }}
            >
                <Pagination total={10} size="sm" />
            </Box>
        </>
    );
};

export default DataTable;