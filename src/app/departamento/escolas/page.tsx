'use client'

import { Table, Box } from '@mantine/core';
import { Button } from '../../../components/general';
import { IconFileInfo } from "@tabler/icons-react";
import DataTable from '../../../components/general/DataTable';
import ClearableInput from '../../../components/general/ClearableInput';
import { withFormik } from 'formik';
import { useUpdateTitle } from '../../../hooks/useTitle';
import { useEffect } from 'react';
import ModalDetalheEscola from '../../../components/Modals/ModalDetalheEscola';
import { useDisclosure } from '@mantine/hooks';

function DetalhesEscola(props: any) {

    const updateTitle = useUpdateTitle();

    useEffect(() => {
        updateTitle('Escolas Cadastradas')
    }, [])

    const [opened, { open, close }] = useDisclosure(false);

    const tableHeaders = ["NOME DA ESCOLA", 'REPRESENTANTE', 'STATUS'];

    const elements = [
        { name: 'Escola Municipal Professor Eulalio Gruppi', representante:'Fulano', ativo: true },
        { name: 'Escola 2', representante:'Fulano', ativo: true },
        { name: 'Escola 3', representante:'Fulano', ativo: false },
        { name: 'Escola 4', representante:'Fulano', ativo: true },
    ];

    const additionalButtons = [
        { id: 1, icon: <IconFileInfo/>, onClick: open },
    ];

    return (
        <>
            <ModalDetalheEscola open={opened} close={close} />

            <Box
                w='100%'
                h="89vh"
                display='flex'
                style={{ flexDirection: 'column' }}>

                <Box h='8%' mt='1rem'>
                    <ClearableInput placeholder="Pesquisar" label='Pesquisar' />
                </Box>

                <DataTable headerElements={tableHeaders} elements={elements} additionalButtons={additionalButtons} activate />

            </Box>
        </>
    );
};

export default withFormik({
    validateOnChange: false,
    validateOnBlur: false,
    handleSubmit: () => 1
})(DetalhesEscola);