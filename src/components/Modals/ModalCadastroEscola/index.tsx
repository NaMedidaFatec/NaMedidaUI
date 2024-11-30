import { Button, Divider, Grid, Input, Modal, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { TimeInput } from "@mantine/dates";
import { IconChevronDown } from "@tabler/icons-react";
import UserService from "../../../services/user";
import EscolaService from "../../../services/escola";
import { notifications } from "@mantine/notifications";

interface ComponentProps {
    open?: boolean;
    close?: () => void;
    fetchEscolas?: () => void;
    isEdicao?: boolean;
    editEscola?: {
        ativo?: boolean;
        bairro?: string;
        cep?: string;
        cie?: string;
        ddd?: string;
        email?: string;
        id?: number;
        logradouro?: string;
        nome?: string;
        numero?: string;
        telefone?: string;
        cnpj?: string;
        razaoSocial?: string;
        horarioAbertura?: string;
        horarioFechamento?: string;
        nivelEnsino?: string;
        cidade?: number;
        tipoPessoa?: string;
        endNumero?: string;
        endComplemento?: string,
    };
}

export default function ModalCadastroEscola({ open, close, isEdicao, editEscola, fetchEscolas }: ComponentProps) {
    const originalFormData = {
        nome: '',
        razaoSocial: '',
        cie: '',
        cnpj: '',
        email: '',
        tipoPessoa: 'PJ',
        departamento: 0,
        horarioAbertura: '06:00',
        horarioFechamento: '18:00',
        nivelEnsino: 'INFANTIL',
        telefoneForm: {
            numero: '',
            ddd: ''
        },
        enderecoForm: {
            numero: '',
            logradouro: '',
            complemento: '',
            bairro: '',
            cep: '',
            cidade: undefined
        },
    };

    const [cidades, setCidades] = useState([]);

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
            departamento: loggedUser?.departamento ? loggedUser?.departamento?.id : 0
        }));
        fetchCidades();
    }, [open]);

    const prepararEdicao = () => {
        setFormData(prevState => ({
            ...prevState,
            nome: isEdicao ? editEscola?.nome : '',
            razaoSocial: isEdicao ? editEscola?.razaoSocial : '',
            cnpj: isEdicao ? editEscola?.cnpj : '',
            email: isEdicao ? editEscola?.email : '',
            tipoPessoa: isEdicao ? editEscola?.tipoPessoa : 'PJ',
            horarioAbertura: isEdicao ? editEscola?.horarioAbertura?.substring(0, 5) : '06:00',
            horarioFechamento: isEdicao ? editEscola?.horarioFechamento?.substring(0, 5) : '18:00',
            nivelEnsino: isEdicao ? editEscola?.nivelEnsino : '',
            telefoneForm: {
                numero: isEdicao ? editEscola?.numero : '',
                ddd: isEdicao ? editEscola?.ddd : ''
            },
            enderecoForm: {
                numero: isEdicao ? editEscola?.endNumero : '',
                logradouro: isEdicao ? editEscola?.logradouro : '',
                complemento: isEdicao ? editEscola?.endComplemento : '',
                bairro: isEdicao ? editEscola?.bairro : '',
                cep: isEdicao ? editEscola?.cep : '',
                cidade: isEdicao ? editEscola?.cidade : undefined
            },
        }));
    }

    const handleChange = (e) => {
        const { name, value } = e?.target;

        if (name.startsWith('telefoneForm') || name.startsWith('enderecoForm')) {
            const [section, field] = name.split('.');
            console.log(section, field);

            setFormData((prevState) => ({
                ...prevState,
                [section]: {
                    ...prevState[section],
                    [field]: field === 'cidade' ? Number(value) : value
                }
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const fetchCidades = async () => {
        const cidades = await UserService.fetchCidades();
        setCidades(cidades?.content?.map(cidade => ({
            id: cidade.id,
            nome: cidade.nome
        })));
    };

    const saveEscola = async () => {
        try {
            if (isEdicao) {
                const { departamento, ...rest } = formData;
                await EscolaService.saveEscola(editEscola?.id, rest);
            } else {
                await EscolaService.createEscola(formData);
            }
            notifications.show({ title: 'Salvo com sucesso', message: '', position: 'bottom-left', color: 'blue' });
            setTimeout(() => {
                fetchEscolas();
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
                size="60vw"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                title={
                    <Text size="xl" fw={200}>
                        Nova Escola
                    </Text>}
            >
                <Divider size="xs" />

                <Grid mt='md'>
                    <Grid.Col span={6}>
                        <TextInput
                            value={formData.nome}
                            name="nome"
                            onChange={handleChange}
                            label='Nome da escola'
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            value={formData.razaoSocial}
                            name="razaoSocial"
                            onChange={handleChange}
                            label='Razão social'
                            required
                        />
                    </Grid.Col>
                </Grid>

                <Grid>
                    <Grid.Col span={3}>
                        <TextInput
                            name="cnpj"
                            value={formData.cnpj}
                            onChange={handleChange}
                            label='CNPJ'
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={5}>
                        <TextInput
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            label='E-mail'
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <TextInput
                            name="telefoneForm.ddd"
                            value={formData.telefoneForm.ddd}
                            onChange={handleChange}
                            label='DDD'
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <TextInput
                            name="telefoneForm.numero"
                            value={formData.telefoneForm.numero}
                            onChange={handleChange}
                            label='Número'
                            required
                        />
                    </Grid.Col>
                </Grid>

                <Grid>
                    <Grid.Col span={4}>
                        <TimeInput
                            name="horarioAbertura"
                            value={formData.horarioAbertura}
                            onChange={handleChange}
                            label="Horário de abertura"
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <TimeInput
                            name="horarioFechamento"
                            value={formData.horarioFechamento}
                            onChange={handleChange}
                            label="Horário de fechamento"
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Input.Wrapper label={"Nivel de ensino"} required>
                            <Input
                                component="select"
                                name="nivelEnsino"
                                value={formData.nivelEnsino}
                                onChange={handleChange}
                                rightSection={<IconChevronDown size={14} stroke={1.5} />}
                                pointer
                            >
                                <option value="INFANTIL">Infantil</option>
                                <option value="ENSINO_FUNDAMENTAL">Fundamental</option>
                                <option value="MEDIO">Médio</option>
                                <option value="SUPERIOR">Superior</option>
                            </Input>
                        </Input.Wrapper>

                    </Grid.Col>
                </Grid>

                <Divider size="xs" my='md' />

                <Text size="xl" fw={200}>
                    Endereço
                </Text>

                <Grid >
                    <Grid.Col span={6}>
                        <TextInput
                            value={formData.enderecoForm.logradouro}
                            name="enderecoForm.logradouro"
                            onChange={handleChange}
                            label='Logradouro'
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            value={formData.enderecoForm.bairro}
                            name="enderecoForm.bairro"
                            onChange={handleChange}
                            label='Bairro'
                            required
                        />
                    </Grid.Col>
                </Grid>

                <Grid >
                    <Grid.Col span={4}>
                        <TextInput
                            value={formData.enderecoForm.numero}
                            name="enderecoForm.numero"
                            onChange={handleChange}
                            label='Numero'
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <TextInput
                            value={formData.enderecoForm.complemento}
                            name="enderecoForm.complemento"
                            onChange={handleChange}
                            label='Complemento'
                        />
                    </Grid.Col>
                </Grid>

                <Grid >
                    <Grid.Col span={6}>
                        <TextInput
                            value={formData.enderecoForm.cep}
                            name="enderecoForm.cep"
                            onChange={handleChange}
                            label='CEP'
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Input.Wrapper label={"Cidade"} required>
                            <Input
                                component="select"
                                name="enderecoForm.cidade"
                                value={formData?.enderecoForm?.cidade}
                                onChange={handleChange}
                                rightSection={<IconChevronDown size={14} stroke={1.5} />}
                                pointer
                            >
                                <option
                                    defaultValue=""
                                    disabled
                                    selected
                                >
                                    Selecione a cidade
                                </option>
                                {cidades.map(cidade => (
                                    <option
                                        key={cidade?.id}
                                        value={Number(cidade?.id)}
                                    >
                                        {cidade?.nome}
                                    </option>
                                ))}
                            </Input>
                        </Input.Wrapper>
                    </Grid.Col>
                </Grid>

                <Button
                    mt='md'
                    fullWidth
                    variant="gradient"
                    fs='22rem'
                    onClick={saveEscola}
                >
                    SALVAR
                </Button>
            </Modal>
        </>
    );
}