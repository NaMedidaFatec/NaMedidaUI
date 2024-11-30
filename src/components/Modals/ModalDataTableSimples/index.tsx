import { Box, Divider, Modal, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import EscolaService from "../../../services/escola";
import DataTable from "../../general/DataTable";

export default function ModalDataTableSimples({ open, close, refeicaoId }) {
    const [listaItens, setListaItens] = useState([]);
    useEffect(() => {
        fetchItensRefeicoes();
    }, [open]);

    const fetchItensRefeicoes = async () => {
        try {
            if (refeicaoId !== 0) {
                const itens = await EscolaService.fetchRefeicaoItens(refeicaoId)
                setListaItens(itens?.content?.map((item) => ({
                    id: item?.id,
                    produto: item?.produto?.nome,
                    desc: item?.produto?.descricao,
                })));
            }
            console.log(refeicaoId);
        } catch (error) {
            console.log(error.message);
        }
    }
    const tableHeaders = ["CÓD", "PRODUTO", 'DESCRIÇÃO'];

    return (
        <>
            <Modal
                opened={open}
                onClose={close}
                centered
                size="auto"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                title={
                    <Text size="xl" fw={200}>
                        Itens
                    </Text>}
            >
                <Divider size="xs" />

                <Box display={'flex'} style={{ justifyContent: 'center' }} >
                    <DataTable
                        headerElements={tableHeaders}
                        elements={listaItens}
                        >

                    </DataTable>
                </Box>
            </Modal>
        </>
    );
}