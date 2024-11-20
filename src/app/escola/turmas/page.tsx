'use client'

import { Box, Button, Grid } from '@mantine/core';
import DataTable from '../../../components/general/DataTable';
import ClearableInput from '../../../components/general/ClearableInput';
import { withFormik } from 'formik';
import { IconFileInfo, IconFilePencil, IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useUpdateTitle } from '../../../hooks/useTitle';
import ModalCadastroTurma from '../../../components/Modals/ModalCadastroTurma';
import ModalDetalheTurma from '../../../components/Modals/ModalDetalheTurma';
import { useDisclosure } from '@mantine/hooks';
import EscolaTurmaService from '../../../services/escola/turmas';
import { notifications } from '@mantine/notifications';

function DetalhesTurmas(props: any) {
    const [turmas, setTurmas] = useState([]);
    const [searchField, setSearchField] = useState("");
    const [selectedTurma, setSelectedTurma] = useState({});
    const [filteredTurmas, setFilteredTurmas] = useState([]);
    const [isEdicao, setEdicao] = useState(false);


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
        const turmasList = turmas?.content?.map(turma => ({
            id: turma?.id,
            descricao: turma?.nome,
            sala: turma?.sala,
            qtdAlunos: turma?.quantidade,
            ativo: turma?.enabled,
            horarioInicial: turma?.horarioInicial,
            horarioFinal: turma?.horarioFinal,
        }));

        setTurmas(turmasList);
        setFilteredTurmas(turmasList);
    };

    const toggleActivationFunction = async (element: any) => {
        try {
            await EscolaTurmaService.toggleStatusTurma(element?.id).then(
                fetchTurmas
            );
        } catch (error) {
            console.log(error?.message);
            notifications.show({ title: 'Erro ao desativar!', message: error?.message, position: 'bottom-left', color: 'red' })
        }
    };

    const openInfoModal = (clickedItemId: string) => {
        setSelectedTurma(turmas.find((element) => element?.id === clickedItemId));
        handlers.open();
    };

    const openCreateModal = () => {
        setEdicao(false);
        open();
    };

    const openEditModal = (clickedItemId: string) => {
        setSelectedTurma(turmas.find((element) => element?.id === clickedItemId));
        setEdicao(true);
        open();
    };

    const tableHeaders = ["CÓD", "DESC.", "QTD ALUNOS", "SALA", "STATUS"];

    const additionalButtons = [
        {
            id: 1,
            icon: <IconFilePencil />,
            onClick: (element: any) => openEditModal(element?.id)
        },
        {
            id: 2,
            icon: <IconFileInfo />,
            onClick: (element: any) => openInfoModal(element?.id)
        },
    ]

    return (
        <>
            <ModalCadastroTurma open={openedCadastro} close={close} isEdicao={isEdicao} editTurma={selectedTurma} fetchTurmas={fetchTurmas}/>

            <ModalDetalheTurma open={openedDetalhe} close={handlers?.close} turma={selectedTurma} />

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
                    elements={filteredTurmas?.map(turma => ({
                        id: turma?.id,
                        descricao: turma?.descricao,
                        qtdAlunos: turma?.qtdAlunos,
                        sala: turma?.sala,
                        ativo: turma?.ativo
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
})(DetalhesTurmas);