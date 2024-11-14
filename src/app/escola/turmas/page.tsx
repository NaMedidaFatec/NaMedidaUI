'use client'

import { Pagination, Text, Box, Button, Grid, Paper, useComputedColorScheme } from '@mantine/core';
import DataTable from '../../../components/general/DataTable';
import ClearableInput from '../../../components/general/ClearableInput';
import { withFormik } from 'formik';
import { IconFileInfo, IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useUpdateTitle } from '../../../hooks/useTitle';
import ModalCadastroTurma from '../../../components/Modals/ModalCadastroTurma';
import ModalDetalheTurma from '../../../components/Modals/ModalDetalheTurma';
import { useDisclosure } from '@mantine/hooks';
import EscolaService from '../../../services/escola';
import EscolaTurmaService from '../../../services/escola/turmas';

function DetalhesTurmas(props: any) {
    const [turmas, setTurmas] = useState([]);
    const [searchField, setSearchField] = useState("");
    const [selectedTurma, setSelectedTurma] = useState({});
    const [filteredTurmas, setFilteredTurmas] = useState([]);

    const [openedCadastro, { open, close }] = useDisclosure(false);
    const [openedDetalhe, handlers] = useDisclosure(false);

    const updateTitle = useUpdateTitle();

    useEffect(() => {
        updateTitle('Minhas Turmas');
        fetchTurmas();
    }, [])

    useEffect(() => {
        search();
    }, [searchField])


    const search = async () => {
        if (turmas && searchField) {
            const filtered = turmas.filter(filterLista);
            setFilteredTurmas(filtered);
        } else {
            setFilteredTurmas(turmas);
        }
    };

    const filterLista = (item) => {
        const regex = new RegExp(searchField, 'ig');
        return (
            regex.test(item.id) ||
            regex.test(item.descricao) ||
            regex.test(item.sala) ||
            regex.test(item.qtdAlunos)
        );
    };

    const fetchTurmas = async () => {
        const turmas = await EscolaTurmaService.fetchAllTurmas();
        const turmasList = turmas?.content?.map(escola => ({
            id: escola?.id,
            descricao: escola?.nome,
            sala: escola?.sala,
            qtdAlunos: escola?.quantidade,
            horarioInicial: escola?.horarioInicial,
            horarioFinal: escola?.horarioFinal,
        }));

        setTurmas(turmasList);
        setFilteredTurmas(turmasList);
    };

    const tableHeaders = ["CÓD", "DESC.", "QTD ALUNOS", "SALA"];

    const openInfoModal = async (rowId: any) => {
        setSelectedTurma(turmas.find((element) => element?.id === rowId));
        handlers.open();
    };

    return (
        <>
            <ModalCadastroTurma open={openedCadastro} close={close} />

            <ModalDetalheTurma open={openedDetalhe} close={handlers?.close} turma={selectedTurma}/>

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
                        <Button h='4rem' w='4rem' variant="gradient" onClick={open} style={{ borderRadius: '10rem' }}>
                            <IconPlus size={23} />
                        </Button>
                    </Grid.Col>
                </Grid>

                <DataTable
                    headerElements={tableHeaders}
                    elements={filteredTurmas?.map(turma => ({
                        id: turma?.id,
                        descricao: turma?.descricao,
                        qtdAlunos: turma?.qtdAlunos,
                        sala: turma?.sala,
                    }))}
                    openInfoModal={openInfoModal}
                    infoButton />

            </Box>
        </>
    );
};

export default withFormik({
    validateOnChange: false,
    validateOnBlur: false,
    handleSubmit: () => 1
})(DetalhesTurmas);