import { Badge, Box, Button, Divider, Group, Modal, Text, TextInput } from "@mantine/core";
import DataTable from "../../general/DataTable";
import ClearableInput from "../../general/ClearableInput";
import { useCounter } from "@mantine/hooks";
import RequisicaoService from "../../../services/general/requisicao";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import ProdutoService from "../../../services/departamento/estoque/produto";

interface ComponentProps {
    open?: boolean;
    close?: () => void;
    fetchPedidos?: () => void;
}

export default function ModalCadastroPedido({ open, close, fetchPedidos }: ComponentProps) {
    const originalFormData = {
        observacoes: '',
        data: new Date,
        finalizada: false,
        unidadeEnsino: 0,
        departamento: 1,
    };

    const [formData, setFormData] = useState(originalFormData);

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('@namedida:user'));
        setFormData(prevState => ({
            ...prevState,
            unidadeEnsino: loggedUser?.unidadeEnsino ? loggedUser?.unidadeEnsino?.id : 0,
        }));
    }, [open]);

    const saveRequisicao = async () => {
        try {
            await RequisicaoService.createPedido(formData);
            notifications.show({ title: 'Salvo com sucesso', message: '', position: 'bottom-left', color: 'blue' });
            setTimeout(() => {
                fetchPedidos();
            }, 750);
            close();
        } catch (error) {
            console.log(error);
            notifications.show({ title: 'Erro ao salvar', message: error?.message, position: 'bottom-left', color: 'red' });
        }
    };

    return (
        <>
            <Modal
                opened={open}
                onClose={close}
                centered
                size="70vw"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                title={
                    <Text size="xl" fw={200}>
                        Novo pedido
                    </Text>}
            >
                <Divider size="xs" />

                <Box my='md'>
                    <TextInput
                        value={formData.observacoes}
                        name="nome"
                        onChange={(event) => setFormData({ ...formData, observacoes: event?.target?.value })}
                        label='Observações deste pedido?'
                        description="*NÃO OBRIGATÓRIO"
                    />
                </Box>

                <Box mt='md' display="flex" style={{ justifyContent: "flex-end" }}>
                    <Button size="md" variant="gradient" onClick={saveRequisicao}>
                        Criar Pedido
                    </Button>
                </Box>

            </Modal>
        </>
    );
}