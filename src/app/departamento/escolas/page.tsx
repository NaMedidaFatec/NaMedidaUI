'use client'

import { Box, Grid } from '@mantine/core';
import { Button } from '../../../components/general';
import { IconFileInfo, IconFilePencil, IconPlus, IconUserFilled } from "@tabler/icons-react";
import DataTable from '../../../components/general/DataTable';
import ClearableInput from '../../../components/general/ClearableInput';
import { withFormik } from 'formik';
import { useUpdateTitle } from '../../../hooks/useTitle';
import { useEffect, useState } from 'react';
import ModalDetalheEscola from '../../../components/Modals/ModalDetalheEscola';
import { useDisclosure } from '@mantine/hooks';
import EscolaService from '../../../services/escola';
import { notifications } from '@mantine/notifications';
import ModalCadastroEscola from '../../../components/Modals/ModalCadastroEscola';
import ModalSelecaoRepresentante from '../../../components/Modals/ModalSelecaoRepresentante';

function DetalhesEscola(props: any) {
    const [escolas, setEscolas] = useState([]);
    const [searchField, setSearchField] = useState("");
    const [selectedEscola, setSelectedEscola] = useState({});
    const [filteredEscolas, setFilteredEscolas] = useState([]);
    const [isEdicao, setEdicao] = useState(false);
    
    const [opened, handlers] = useDisclosure(false);
    const [openedCadastro, { open, close }] = useDisclosure(false);
    const [openedResponsavel, setOpenedResponsavel] = useState(false);

    const updateTitle = useUpdateTitle();

    useEffect(() => {
        updateTitle('Escolas Cadastradas')
        fetchEscolas();
    }, [])

    useEffect(() => {
        search();
    }, [searchField])

    const search = async () => {
        if (escolas && searchField) {
            const filtered = escolas.filter(filterLista);
            setFilteredEscolas(filtered);
        } else {
            setFilteredEscolas(escolas);
        }
    };

    const filterLista = (item) => {
        const regex = new RegExp(searchField, 'ig');
        return (
            regex.test(item.id) ||
            regex.test(item.nome) ||
            regex.test(item.quantidade) ||
            regex.test(item.representante) ||
            regex.test(item.email) ||
            regex.test(item.telefone) ||
            regex.test(item.cie) ||
            regex.test(item.logradouro) ||
            regex.test(item.bairro) ||
            regex.test(item.numero) ||
            regex.test(item.cep)
        );
    };

    const fetchEscolas = async () => {
        const escolas = await EscolaService.fetchAll();
        const escolasList = escolas?.content?.map(escola => ({
            id: escola?.id,
            nome: escola?.nome,
            ativo: escola?.enabled,
            representante: escola?.responsavel?.nome,
            email: escola?.email,
            ddd: escola?.telefone?.ddd,
            telefone: escola?.telefone?.numero,
            qtdTurmas: escola?.unidadeEnsinoTurmas?.length,
            cie: escola?.cie,
            logradouro: escola?.endereco?.logradouro,
            bairro: escola?.endereco?.bairro,
            numero: escola?.endereco?.numero,
            cep: escola?.endereco?.cep,
            endNumero: escola?.endereco?.numero,
            endComplemento: escola?.endereco?.complemento,
            cnpj: escola?.cnpj,
            razaoSocial: escola?.razaoSocial,
            horarioAbertura: escola?.horarioAbertura,
            horarioFechamento: escola?.horarioFechamento,
            nivelEnsino: escola?.nivelEnsino?.id,
            cidade: escola?.endereco?.cidade?.id,
            tipoPessoa: escola?.tipoPessoa
        }));

        setEscolas(escolasList);
        setFilteredEscolas(escolasList);
    };

    const toggleActivationFunction = async (element: any) => {
        try {
            await EscolaService.toggleStatusEscola(element?.id).then(
                fetchEscolas
            );
        } catch (error) {
            console.log(error?.message);
            notifications.show({ title: 'Erro ao desativar!', message: error?.message, position: 'bottom-left', color: 'red' })
        }
    };

    const fetchRepresentantes = async (clickedItemId: any) => {
        // const representantes = await UserService.fetchAllUsersResponsaveis();
        setOpenedResponsavel(true)
    };

    const openInfoModal = (clickedItemId: string) => {
        setSelectedEscola(escolas.find((element) => element?.id === clickedItemId));
        handlers?.open();
    };

    const openCreateModal = () => {
        setEdicao(false);
        open();
    };

    const openEditModal = (clickedItemId: string) => {
        setSelectedEscola(escolas.find((element) => element?.id === clickedItemId));
        setEdicao(true);
        open();
    };

    const tableHeaders = ["CÓD", "NOME DA ESCOLA", 'REPRESENTANTE', 'STATUS'];

    const additionalButtons = [
        {
            id: 1,
            icon: <IconUserFilled />,
            onClick: (element: any) => fetchRepresentantes(element?.id)
        },
        {
            id: 2,
            icon: <IconFilePencil />,
            onClick: (element: any) => openEditModal(element?.id)
        },
        {
            id: 3,
            icon: <IconFileInfo />,
            onClick: (element: any) => openInfoModal(element?.id)
        },
    ];

    return (
        <>
            <ModalDetalheEscola open={opened} close={handlers?.close} escola={selectedEscola} />

            <ModalCadastroEscola open={openedCadastro} close={close} isEdicao={isEdicao} editEscola={selectedEscola} fetchEscolas={fetchEscolas}/>

            <ModalSelecaoRepresentante open={openedResponsavel} close={() => setOpenedResponsavel(false)} />

            <Box
                w='100%'
                h="89vh"
                display='flex'
                style={{ flexDirection: 'column' }}>

                <Grid h='auto' mt='1rem'>
                    <Grid.Col span={6}>
                        <ClearableInput
                            placeholder="Pesquisar"
                            label='Pesquisar'
                            value={searchField}
                            setValue={setSearchField}
                        />
                    </Grid.Col>
                    <Grid.Col span={3} offset={3} display='flex' style={{ justifyContent: 'flex-end' }}>
                        <Button h='4rem' w='4rem' variant="gradient" onClick={openCreateModal} style={{ borderRadius: '10rem' }}>
                            <IconPlus size={23} />
                        </Button>
                    </Grid.Col>
                </Grid>

                <DataTable
                    headerElements={tableHeaders}
                    elements={filteredEscolas?.map(escola => ({
                        id: escola?.id,
                        nome: escola?.nome,
                        representante: escola?.representante || "N/A",
                        ativo: escola?.ativo,
                    }))}
                    additionalButtons={additionalButtons}
                    activate
                    toggleActivationFunction={toggleActivationFunction}
                />

            </Box>
        </>
    );
};

export default withFormik({
    validateOnChange: false,
    validateOnBlur: false,
    handleSubmit: () => 1
})(DetalhesEscola);