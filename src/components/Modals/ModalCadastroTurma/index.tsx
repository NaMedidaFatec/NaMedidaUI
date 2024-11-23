import { Box, Button, Divider, Grid, Modal, NumberInput, Select, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import DataTable from "../../general/DataTable";
import ClearableInput from "../../general/ClearableInput";
import EscolaTurmaService from "../../../services/escola/turmas";
import { notifications } from "@mantine/notifications";
import DateInput from "../../general/DateInput";

interface ComponentProps {
    open?: boolean;
    close?: () => void;
    fetchTurmas?: () => void;
    isEdicao?: boolean;
    editTurma?: {
        ativo?: true
        descricao?: string
        horarioFinal?: string
        horarioInicial?: string
        id?: number
        qtdAlunos?: number
        sala?: string
    };
}

export default function ModalCadastroTurma({ open, close, isEdicao, editTurma, fetchTurmas }: ComponentProps) {
    const originalFormData = {
        nome: '',
        quantidade: 0,
        horarioInicial: undefined,
        horarioFinal: undefined,
        sala: '',
        unidadeEnsino: 0,
    };

    const [formData, setFormData] = useState(originalFormData);

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('@namedida:user'));
        if (isEdicao) {
            prepararEdicao();
        } else {
            setFormData(originalFormData);
        }
        setFormData(prevState => ({
            ...prevState,
            unidadeEnsino: loggedUser?.unidadeEnsino ? loggedUser?.unidadeEnsino?.id : 0,
        }));
    }, [open]);

    const prepararEdicao = () => {
        setFormData(prevState => ({
            ...prevState,
            nome: isEdicao ? editTurma?.descricao : '',
            quantidade: isEdicao ? editTurma?.qtdAlunos : 0,
            horarioInicial: isEdicao ? editTurma?.horarioInicial : undefined,
            horarioFinal: isEdicao ? editTurma?.horarioFinal : undefined,
            sala: isEdicao ? editTurma?.sala : '',
        }));
    }

    const handleChange = (e) => {
        const { name, value } = e?.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const saveTurma = async () => {
        try {
            if (isEdicao) {
                await EscolaTurmaService.saveTurma(editTurma?.id, formData);
            } else {
                await EscolaTurmaService.createTurma(formData);
            }
            notifications.show({ title: 'Salvo com sucesso', message: '', position: 'bottom-left', color: 'blue' });
            setTimeout(() => {
                fetchTurmas();
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
                size="50vw"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                title={
                    <Text size="xl" fw={200}>
                        {isEdicao ? "Editar turma" : "Nova Turma"}
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
                            setValue={(value) => setFormData({ ...formData, horarioInicial: value })}
                            value={formData.horarioInicial}
                            name="horarioInicial"
                            label="Data inicial"
                            required
                        />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <DateInput
                            setValue={(value) => setFormData({ ...formData, horarioFinal: value })}
                            value={formData.horarioFinal}
                            name="horarioFinal"
                            label="Data final"
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
                    SALVAR
                </Button>
            </Modal>
        </>
    );
}