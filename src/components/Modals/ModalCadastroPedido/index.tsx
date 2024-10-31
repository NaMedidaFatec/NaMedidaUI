import { Badge, Box, Button, Divider, Group, Modal, Text } from "@mantine/core";
import DataTable from "../../general/DataTable";
import ClearableInput from "../../general/ClearableInput";
import { useCounter } from "@mantine/hooks";

interface ComponentProps {
    open?: boolean;
    close?: () => void;
}

export default function ModalCadastroPedido({ open, close }: ComponentProps) {
    const tableHeaders = ["Código", "Produto", "Disponível", "Quantidade"];

    const elements = [
        { id: 1, produto: 'Arrozzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', desc: 50, quantidade: 10 },
        { id: 2, produto: 'Feijão', desc: 50, quantidade: 10 },
        { id: 3, produto: 'Laranja', desc: 50, quantidade: 10 },
        { id: 4, produto: 'Pão', desc: 50, quantidade: 10 },
    ];

    const additionalButtons = [
        { id: 1, icon: "SELECIONAR", onClick: () => 1 },
    ];

    const [count, { increment, decrement }] = useCounter(3, { min: 0 });

    const badges = Array(count)
        .fill(0)
        .map((_, index) => <Badge key={index}>Badge {index}</Badge>);

    return (
        <>
            <Modal
                opened={open}
                onClose={close}
                centered
                size="70vw"
                title={
                    <Text size="xl" fw={200}>
                        Novo pedido
                    </Text>}
            >
                <Divider size="xs" />

                <Box my='md'>
                    <ClearableInput placeholder="Pesquisar" label="Pesquisar" />
                </Box>

                <Group wrap="nowrap" mt="md">
                    {badges}
                </Group>

                <DataTable
                    headerElements={tableHeaders}
                    elements={elements}
                    stripped={false}
                    withRowBorders
                    withBgColor={false}
                    withTableBorder
                    additionalButtons={additionalButtons}
                />

                <Box mt='md' display="flex" style={{ justifyContent: "flex-end" }}>
                    <Button size="md" variant="gradient">
                        Finalizar Pedido
                    </Button>
                </Box>

            </Modal>
        </>
    );
}