import { Box, Button, Divider, Grid, Input, Modal, NumberInput, Select, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import ClearableInput from "../../general/ClearableInput";
import { IconChevronDown } from "@tabler/icons-react";
import EscolaService from "../../../services/escola";
import { notifications } from "@mantine/notifications";

interface ComponentProps {
    open?: boolean;
    close?: () => void;
    fetchEscolas?: () => void;
    escolaSelecionada?: {
        id?: number
    }
}

export default function ModalSelecaoRepresentante({ open, close, escolaSelecionada, fetchEscolas }: ComponentProps) {
    const [representantes, setRepresentantes] = useState([]);
    const [formData, setFormData] = useState({
        escolaId: 0,
        representanteId: 0,
    });

    useEffect(() => {
        setFormData((prevState) => ({
            ...prevState,
            escolaId: escolaSelecionada?.id || 0
        }))
        fetchRepresentantes();
    }, [open]);

    const fetchRepresentantes = async () => {
        try {
            const listaRepresentantes = await EscolaService.fetchResponsaveis();
            setRepresentantes(listaRepresentantes?.content);
        } catch (error) {
            console.error(error?.message)
        }
    }

    const vincularResponsavel = async () => {
        try {
            const listaRepresentantes = await EscolaService.vincularResponsavel(formData.escolaId, formData.representanteId);
            notifications.show({ title: 'Responsável vinculado com sucesso!', message: "", position: 'bottom-left' });
            setTimeout(() => {
                fetchEscolas();
            }, 750)
            close()
        } catch (error) {
            console.error(error?.message)
            notifications.show({ title: 'Erro ao vincular responsavel!', message: error?.message, position: 'bottom-left', color: 'red' })
        }
    }

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
                        Selecionar representante
                    </Text>}
            >
                <Divider size="xs" mb='sm' />

                <Input.Wrapper label={"Representante"} required>
                    <Input
                        component="select"
                        onChange={(e) => setFormData({ ...formData, representanteId: Number(e?.target?.value) })}
                        rightSection={<IconChevronDown size={14} stroke={1.5} />}
                        pointer
                    >
                        <option
                            defaultValue={0}
                            selected
                        >
                            Selecione o representante
                        </option>
                        {representantes?.map(representante => (
                            <option
                                key={representante?.id}
                                value={representante?.id}
                            >
                                {representante?.nome}
                            </option>
                        ))}
                    </Input>
                </Input.Wrapper>

                <Button
                    mt='md'
                    fullWidth
                    variant="gradient"
                    fs='22rem'
                    onClick={vincularResponsavel}
                >
                    VINCULAR
                </Button>
            </Modal>
        </>
    );
}