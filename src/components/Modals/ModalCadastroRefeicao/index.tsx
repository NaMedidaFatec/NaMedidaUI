import { Badge, Box, Button, Divider, Grid, Group, Modal, Text, TextInput } from "@mantine/core";
import DataTable from "../../general/DataTable";
import ClearableInput from "../../general/ClearableInput";
import { useCounter } from "@mantine/hooks";
import RequisicaoService from "../../../services/general/requisicao";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import ProdutoService from "../../../services/departamento/estoque/produto";
import { TimeInput } from "@mantine/dates";
import EscolaService from "../../../services/escola";

interface ComponentProps {
    open?: boolean;
    close?: () => void;
    fetchRefeicoes?: () => void;
}

export default function ModalCadastroRefeicao({ open, close, fetchRefeicoes }: ComponentProps) {
    const originalFormData = {
        nome: '',
        descricao: '',
        horarioDisponibilidade: '',
        unidadeEnsino: 0,
    };

    const [formData, setFormData] = useState(originalFormData);

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('@namedida:user'));
        setFormData(prevState => ({
            ...prevState,
            unidadeEnsino: loggedUser?.unidadeEnsino ? loggedUser?.unidadeEnsino?.id : 0,
        }));
    }, [open]);

    const saveRefeicao = async () => {
        try {
            await EscolaService.createRefeicao(formData);
            notifications.show({ title: 'Salvo com sucesso', message: '', position: 'bottom-left', color: 'blue' });
            setTimeout(() => {
                fetchRefeicoes();
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
                        Nova refeição
                    </Text>}
            >
                <Divider size="xs" />

                <Grid my='md'>
                    <Grid.Col span={4}>
                        <TextInput
                            value={formData.nome}
                            onChange={(event) => setFormData({ ...formData, nome: event?.target?.value })}
                            label='Nome da refeição'
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <TextInput
                            value={formData.descricao}
                            onChange={(event) => setFormData({ ...formData, descricao: event?.target?.value })}
                            label='Descrição'
                            required

                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                    <TimeInput
                            name="horarioAbertura"
                            value={formData.horarioDisponibilidade}
                            onChange={(event) => setFormData({ ...formData, horarioDisponibilidade: event?.target?.value })}
                            label="Horário de disponibilidade"
                            required
                        />
                    </Grid.Col>
                </Grid>

                <Box mt='md' display="flex" style={{ justifyContent: "flex-end" }}>
                    <Button size="md" variant="gradient" onClick={saveRefeicao}>
                        Criar Refeição
                    </Button>
                </Box>

            </Modal>
        </>
    );
}