import { Box, Button, Divider, Grid, Input, Modal, NumberInput, Select, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import DataTable from "../../general/DataTable";
import ClearableInput from "../../general/ClearableInput";
import { IconChevronDown } from "@tabler/icons-react";
import ProdutoService from "../../../services/departamento/estoque/produto";
import { notifications } from "@mantine/notifications";

interface ComponentProps {
    open?: boolean;
    close?: () => void;
}

export default function ModalCadastroProduto({ open, close }: ComponentProps) {
    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('@namedida:user'));
        setFormData(prevState => ({
            ...prevState,
            departamento: loggedUser?.departamento.id ? loggedUser?.departamento.id : undefined
        }));
    }, [open]);

    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        codigoDeBarras: '',
        categoria: 'ALIMENTICIOS',
        departamento: undefined,
    });

    const handleChange = (e) => {
        const { name, value } = e?.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const saveProduto = async () => {
        try {
            await ProdutoService.createProduto(formData);
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
                        Novo produto
                    </Text>}
            >
                <Divider size="xs" />

                <Grid mt='md'>
                    <Grid.Col span={5}>
                        <TextInput
                            name="nome"
                            onChange={handleChange}
                            value={formData.nome}
                            placeholder="Macarrão"
                            label='Nome'
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={7}>
                        <TextInput
                            name="descricao"
                            onChange={handleChange}
                            value={formData.descricao}
                            placeholder="Macarrão espaguete nro. 8"
                            label='Descrição'
                            required
                        />
                    </Grid.Col>
                </Grid>

                <Grid>
                    <Grid.Col span={8}>
                        <TextInput
                            name="codigoDeBarras"
                            onChange={handleChange}
                            value={formData.codigoDeBarras}
                            placeholder="Código"
                            label='Código de barras'
                            required
                        />
                    </Grid.Col>

                    <Grid.Col span={4}>
                        <Input.Wrapper label={"Categoria"} required>
                            <Input
                                component="select"
                                name="categoria"
                                onChange={handleChange}
                                rightSection={<IconChevronDown size={14} stroke={1.5} />}
                                pointer
                            >
                                <option value="ALIMENTICIOS">Alimentícios</option>
                                <option value="BEBIDAS">Bebidas</option>
                                <option value="HIGIENICOS">Higiénicos</option>
                                <option value="ESPECIAIS">Especiais</option>
                                <option value="INGREDIENTES">Ingredientes</option>
                                <option value="OUTROS">Outros</option>
                            </Input>
                        </Input.Wrapper>
                    </Grid.Col>
                </Grid>

                <Button
                    mt='md'
                    fullWidth
                    variant="gradient"
                    fs='22rem'
                    onClick={saveProduto}
                >
                    SALVAR
                </Button>
            </Modal>
        </>
    );
}