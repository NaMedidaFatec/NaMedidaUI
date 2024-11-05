'use client'

import { Pagination, Text, Box, Button, Grid, Paper, useComputedColorScheme } from '@mantine/core';
import DataTable from '../../../components/general/DataTable';
import ClearableInput from '../../../components/general/ClearableInput';
import { withFormik } from 'formik';
import { IconFileInfo, IconPlus } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useUpdateTitle } from '../../../hooks/useTitle';
import ModalCadastroTurma from '../../../components/Modals/ModalCadastroTurma';
import ModalDetalheTurma from '../../../components/Modals/ModalDetalheTurma';
import { useDisclosure } from '@mantine/hooks';

function DetalhesTurmas(props: any) {

    const updateTitle = useUpdateTitle();

    useEffect(() => {
        updateTitle('Minhas Turmas')
    }, [])

    const [openedCadastro, { open, close }] = useDisclosure(false);
    
    const [openedDetalhe, handlers] = useDisclosure(false);

    const tableHeaders = ["Turma", "Qtd Alunos", "Nível", "Período"];

    const elements = [
        { name: 'Turma 1', qtdAlunos: 20, nivel: 'medio', periodo: 'vespertino' },
        { name: 'Turma 2', qtdAlunos: 20, nivel: 'fundamental', periodo: 'vespertino' },
        { name: 'Turma 3', qtdAlunos: 20, nivel: 'medio', periodo: 'vespertino' },
        { name: 'Turma 4', qtdAlunos: 20, nivel: 'medio', periodo: 'matutino' },
    ];

    const additionalButtons = [
        { id: 1, icon: <IconFileInfo />, onClick: () => handlers?.open()},
    ];

    return (
        <>
            <ModalCadastroTurma open={openedCadastro} close={close} />

            <ModalDetalheTurma open={openedDetalhe} close={() => handlers?.close()} />

            <Box
                w='100%'
                h="89vh"
                display='flex'
                style={{ flexDirection: 'column' }}>

                <Grid h='auto' mt='1rem'>
                    <Grid.Col span={6}>
                        <ClearableInput placeholder="Pesquisar" label="Pesquisar" />
                    </Grid.Col>
                    <Grid.Col span={3} offset={3} display='flex' style={{ justifyContent: 'flex-end' }}>
                        <Button h='4rem' w='4rem' variant="gradient" onClick={open} style={{ borderRadius: '10rem' }}>
                            <IconPlus size={23} />
                        </Button>
                    </Grid.Col>
                </Grid>

                <DataTable headerElements={tableHeaders} elements={elements} additionalButtons={additionalButtons}/>

            </Box>
        </>
    );
};

export default withFormik({
    validateOnChange: false,
    validateOnBlur: false,
    handleSubmit: () => 1
})(DetalhesTurmas);