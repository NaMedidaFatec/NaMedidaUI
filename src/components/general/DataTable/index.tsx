import { Box, Button, Pagination, Paper, Table, Text, useComputedColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ModalDetalheEscola from "../../Modals/Detalhes/ModalDetalheEscola";
import ModalDetalhePedido from "../../Modals/Detalhes/ModalDetalhePedido";

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

interface Element {
    [key: string]: any;
}

interface MyComponentProps {
    headerElements: string[];
    elements: Element[];
    additionalButtons?: Element[];
    activate?: boolean;
    detalheEscola?: boolean;
    detalhePedido?: boolean;
}

const DataTable: React.FC<MyComponentProps> = ({
    headerElements,
    elements,
    additionalButtons = undefined,
    activate = false,
    detalheEscola = false,
    detalhePedido = false,
}) => {

    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    const [opened, { open, close }] = useDisclosure(false);

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
        <Table.Tr key={index} onClick={open}>
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
                        color={element['ativo'] ? 'red' : 'blue'}
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
        <>
            {detalheEscola && <ModalDetalheEscola open={opened} close={close} />}

            {detalhePedido && <ModalDetalhePedido open={opened} close={close} />}

            <Paper
                mah='90%'
                shadow="lg"
                radius="lg"
                mt="md"
                bg={computedColorScheme == "dark" ? 'var(--mantine-color-dark-5)' : '#fff'}>

                <Box h='auto' mah='100%' style={{ overflowX: 'scroll' }} >
                    <Table
                        verticalSpacing="md"
                        striped
                        highlightOnHover
                        withRowBorders={false}
                        horizontalSpacing="xl">
                        <Table.Thead bg='transparent'>
                            {headers}
                        </Table.Thead>
                        <Table.Tbody mah="10%">
                            {rows}
                        </Table.Tbody>
                    </Table>
                </Box>
            </Paper>

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