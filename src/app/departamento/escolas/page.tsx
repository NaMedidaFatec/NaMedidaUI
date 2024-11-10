'use client'

import { Table, Box, Grid } from '@mantine/core';
import { Button } from '../../../components/general';
import { IconFileInfo, IconPlus } from "@tabler/icons-react";
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

function DetalhesEscola(props: any) {
    const [escolas, setEscolas] = useState([]);
    const [searchField, setSearchField] = useState("");
    const [selectedEscola, setSelectedEscola] = useState({});

    const [opened, { open, close }] = useDisclosure(false);
    const [openedCadastro, handlers] = useDisclosure(false);

    const updateTitle = useUpdateTitle();

    useEffect(() => {
        updateTitle('Escolas Cadastradas')
        fetchEscolas();
    }, [])

    useEffect(() => {
        console.log(searchField);
    }, [searchField])

    const search = async () => {
        const escolas = await EscolaService.fetchAll();
        setEscolas(escolas?.content?.map(escola => ({
            id: escola?.id,
            nome: escola?.nome,
            ativo: escola?.enabled,
            representante: escola?.responsavel?.nome,
            email: escola?.email,
            ddd: escola?.telefone?.ddd,
            telefone: escola?.telefone?.numero,
            qtdTurmas: escola?.unidadeEnsinoTurmas?.length,
            cie: escola?.cie
        })));
    };

    const fetchEscolas = async () => {
        const escolas = await EscolaService.fetchAll();
        setEscolas(escolas?.content?.map(escola => ({
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
            cep: escola?.endereco?.cep
        })));
    };

    const tableHeaders = ["CÓD", "NOME DA ESCOLA", 'REPRESENTANTE', 'STATUS'];

    const toggleActivationFunction = async (element: any) => {
        try {
            await EscolaService.toggleStatusEscola(element?.id).then(
                fetchEscolas
            );
        } catch (error) {
            console.log(error?.message);
            notifications.show({ title: 'Erro no login!', message: error?.message, position: 'bottom-left', color: 'red' })
        }
    };

    const openInfoModal = async (rowId: any) => {
        setSelectedEscola(escolas.find((element) => element?.id === rowId));
        open();
    };

    return (
        <>
            <ModalDetalheEscola open={opened} close={close} escola={selectedEscola} />

            <ModalCadastroEscola open={openedCadastro} close={handlers?.close} />
            
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
                        <Button h='4rem' w='4rem' variant="gradient" onClick={handlers?.open} style={{ borderRadius: '10rem' }}>
                            <IconPlus size={23} />
                        </Button>
                    </Grid.Col>
                </Grid>

                <DataTable
                    headerElements={tableHeaders}
                    elements={escolas?.map(escola => ({
                        id: escola?.id,
                        nome: escola?.nome,
                        representante: escola?.representante,
                        ativo: escola?.ativo,
                    }))}
                    infoButton
                    openInfoModal={openInfoModal}
                    activate
                    toggleActivationFunction={toggleActivationFunction} />

            </Box>
        </>
    );
};

export default withFormik({
    validateOnChange: false,
    validateOnBlur: false,
    handleSubmit: () => 1
})(DetalhesEscola);