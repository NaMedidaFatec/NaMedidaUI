import { Box, Divider, Grid, Modal, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import DataTable from "../../general/DataTable";
import RequisicaoItemService from "../../../services/general/requisicaoitem";
import { notifications } from "@mantine/notifications";
import RequisicaoService from "../../../services/general/requisicao";

interface ComponentProps {
    open?: boolean;
    close?: () => void;
    pedido: any;
}

export default function ModalDetalhePedido({ open, close, pedido }: ComponentProps) {
    const [itens, setItens] = useState([]);
    const [pedido2, setPedido] = useState({});

    useEffect(() => {
        console.log(pedido)
        if (pedido.id) {
            // fetchPedido(pedido)
            fetchItens(pedido)
        }
    }, [pedido])

    const tableHeaders = ["Código", "Produto", "Descrição", "Quantidade"];

    const fetchItens = async ({ id }) => {
        try {
            const itens = await RequisicaoItemService.fetchAllByRequisicao(id);
            const itensList = itens?.content?.map((requisicaoitem) => ({
                id: requisicaoitem?.id,
                produto: requisicaoitem?.produto?.nome,
                descricao: requisicaoitem?.produto?.descricao,
                quantidadePendente: requisicaoitem?.quantidadePendente,
            }));

            setItens(itensList);
        } catch (error) {
            console.log(error?.message);
            notifications.show({
            title: "Erro ao buscar os itens!",
            message: error?.message,
            position: "bottom-left",
            color: "red",
            });
        }
    };
    
    return (
        <>
            <Modal
                opened={open}
                onClose={close}
                centered
                size="50vw"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                title={
                    <Text size="xl" fw={200}>
                        Detalhes do pedido
                    </Text>}
            >
                <Divider size="xs" />

                <Box display={'flex'}>
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Código:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        {pedido.id}
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Escola solicitante:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        {pedido.unidadeEnsino}
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Representante:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        {pedido.unidadeEnsino}
                    </Text>
                </Box>

                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Endereço escola:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        {pedido2.unidadeEnsinoEnderecoCompleto}
                    </Text>
                </Box>
                <Box display={'flex'} >
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Telefone contato:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                    {pedido2.unidadeEnsinoTelefoneCompleto}
                    </Text>
                </Box>

                <Box display={'flex'}>
                    <Text size="1.1rem" fw={700} mt={'1.5rem'} mr={'.5rem'}>
                        Data do pedido:
                    </Text>
                    <Text size="1.1rem" fw={200} mt={'1.5rem'}>
                        {pedido.data}
                    </Text>
                </Box>

                <DataTable headerElements={tableHeaders} elements={itens} />

            </Modal>
        </>
    );
}