import { Box, Button, Divider, Grid, Modal, NumberInput, Select, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import DataTable from "../../general/DataTable";
import ClearableInput from "../../general/ClearableInput";
import { DateInput, TimeInput } from "@mantine/dates";
import EscolaTurmaService from "../../../services/escola/turmas";
import { notifications } from "@mantine/notifications";

interface ComponentProps {
    open?: boolean;
    close?: () => void;
}

export default function ModalCadastroTurma({ open, close }: ComponentProps) {
    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('@namedida:user'));
        setFormData(prevState => ({
            ...prevState,
            unidadeEnsino: loggedUser?.unidadeEnsino.id ? loggedUser?.unidadeEnsino.id : 0
        }));
    }, [open]);

    const [formData, setFormData] = useState({
        nome: '',
        quantidade: 0,
        horarioInicial: undefined,
        horarioFinal: undefined,
        sala: '',
        unidadeEnsino: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e?.target;
        console.log(e?.target.value);

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const saveTurma = async () => {
        try {
            await EscolaTurmaService.createTurma(formData);
            notifications.show({ title: 'Salvo com sucesso', message: '', position: 'bottom-left', color: 'blue' });
            setTimeout(() => {
                window.location.reload();
            }, 2500);
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
                size="50vw"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                title={
                    <Text size="xl" fw={200}>
                        Nova Turma
                    </Text>}
            >
                <Divider size="xs" />

                <Grid mt='md'>
                    <Grid.Col span={6}>
                        <TextInput
                            value={formData.nome}
                            name="nome"
                            onChange={handleChange}
                            label='Descrição'
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <NumberInput
                            name="quantidade"
                            onChange={(value) => setFormData({ ...formData, quantidade: Number(value) })}
                            value={formData.quantidade}
                            label="Nº Alunos"
                            placeholder="Nº Alunos"
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <NumberInput
                            name="sala"
                            onChange={(value) => setFormData({ ...formData, sala: value.toString() })}
                            value={formData.sala}
                            label="Nº Sala"
                            placeholder="Nº Sala"
                            required
                        />
                    </Grid.Col>
                </Grid>

                <Grid>
                    <Grid.Col span={6}>
                        <DateInput
                            onChange={(value) => setFormData((prevState) => ({
                                ...prevState,
                                horarioInicial: value
                            }))}
                            name="horarioInicial"
                            label="Data inicial"
                            placeholder={formData.horarioInicial}
                            required
                        />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <DateInput
                            onChange={(value) => setFormData((prevState) => ({
                                ...prevState,
                                horarioFinal: value
                            }))}
                            name="horarioFinal"
                            label="Data final"
                            placeholder={formData.horarioFinal}
                            required
                        />
                    </Grid.Col>
                </Grid>

                <Button
                    mt='md'
                    fullWidth
                    variant="gradient"
                    fs='22rem'
                    onClick={saveTurma}
                >
                    CADASTRAR
                </Button>
            </Modal>
        </>
    );
}