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
    fetchProdutos?: () => void;
    isEdicao?: boolean;
    editProduto?: {
        id?: number;
        nome?: string,
        descricao?: string,
        codigoDeBarras?: string,
        categoria?: string
    };
}

export default function ModalCadastroProduto({ open, close, fetchProdutos, isEdicao, editProduto }: ComponentProps) {
    const originalFormData = {
        nome: '',
        descricao: '',
        codigoDeBarras: '',
        categoria: 'ALIMENTICIOS',
        departamento: 0,
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
            departamento: loggedUser?.departamento.id ? loggedUser?.departamento.id : 0
        }));
    }, [open]);

    const prepararEdicao = () => {
        setFormData(prevState => ({
            ...prevState,
            nome: isEdicao ? editProduto?.nome : '',
            descricao: isEdicao ? editProduto?.descricao : '',
            codigoDeBarras: isEdicao ? editProduto?.codigoDeBarras : '',
            categoria: isEdicao ? editProduto?.categoria : '',
        }));
    }

    const handleChange = (e) => {
        const { name, value } = e?.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const saveProduto = async () => {
        try {
            if (isEdicao) {
                await ProdutoService.saveProduto(editProduto?.id, formData)
            } else {
                await ProdutoService.createProduto(formData);
            }
            notifications.show({ title: 'Salvo com sucesso', message: '', position: 'bottom-left', color: 'blue' });
            setTimeout(() => {
                fetchProdutos();
            }, 750);
            close();
        } catch (error) {
            console.log(error);
            notifications.show({ title: 'Erro ao salvar', message: error?.message, position: 'bottom-left', color: 'red' });
        }
    };
console.log(formData);

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
                            label='Nome'
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={7}>
                        <TextInput
                            name="descricao"
                            onChange={handleChange}
                            value={formData.descricao}
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