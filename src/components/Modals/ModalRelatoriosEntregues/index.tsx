import { Divider, Grid, Modal, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { IconDownload, IconFileInfo } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import DataTable from "../../general/DataTable";
import MinioService from "../../../services/general/minio";
import save from "save-file";
import RelatorioService from "../../../services/general/relatorio";
import classes from "./relatoriosentregues.module.css";
import cx from "clsx";

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

export default function ModalRelatoriosEntregues({ open, close, isEdicao, editEscola, fetchEscolas }: ComponentProps) {
    const [relatorios, setRelatorios] = useState([]);
    const [relatoriosList, setRelatoriosList] = useState([]);

    useEffect(() => {
        if (editEscola?.id) { 
            fetchRelatoriosByUnidadeEnsino(editEscola?.id);
        }
      }, [open]);

    const fetchRelatoriosByUnidadeEnsino = async (escolaId) => {
        const relatorios = await RelatorioService.fetchAllRelatoriosByUnidadeEnsino(escolaId);
        const relatoriosList = relatorios?.content?.map((relatorio) => ({
            id: relatorio?.id,
            status: relatorio?.status?.descricao ?? 'N/A',
            nome: relatorio?.nome,
            dataDeEnvio: relatorio?.dataDeEnvio,
            enviadoPor: relatorio?.enviadoPor?.nome,
        }));
        setRelatorios(relatorios?.content);
        setRelatoriosList(relatoriosList);
    };

    const additionalButtons = [
        {
            id: 1,
            icon: (
                <Grid className={cx(classes.iconReprovar)}>
                <IconFileInfo className={cx(classes.txtReprovar)} />
                <Text className={cx(classes.txtReprovar)}>Aprovar</Text>
              </Grid>
            ),
            onClick: async (element) => {
                try {
                    const relatorio = await relatorios.find((item) => item?.id === element.id);
                    await RelatorioService.saveRelatorio(relatorio?.id, {
                        ...relatorio,
                        enviadoPor: {
                            id: relatorio?.enviadoPor?.id ?? undefined,
                        },
                        status: 'APROVADO'
                    })

                    notifications.show({ title: 'Relatório aprovado com sucesso', message: '', position: 'bottom-left', color: 'blue' });
                    setTimeout(() => {
                        fetchRelatoriosByUnidadeEnsino(editEscola?.id);
                    }, 750);
                } catch (error) {
                    console.log(error)
                }
            } 
        },
        {
            id: 2,
            icon: (
                <Grid className={cx(classes.iconAprovar)}>
                <IconFileInfo className={cx(classes.txtAprovar)} />
                <Text className={cx(classes.txtAprovar)}>Reprovar</Text>
              </Grid>
            ),
            onClick: async (element) => {
                const relatorio = await relatorios.find((item) => item?.id === element?.id);
                try {
                    await RelatorioService.saveRelatorio(relatorio?.id, {
                        ...relatorio,
                        status: 'REPROVADO'
                    })

                    notifications.show({ title: 'Relatório reprovado com sucesso', message: '', position: 'bottom-left', color: 'blue' });
                    setTimeout(() => {
                        fetchRelatoriosByUnidadeEnsino(editEscola?.id);
                    }, 750);
                } catch (error) {
                    
                }
            } 
        },
        {
            id: 3,
            icon: <IconDownload />,
            onClick: async (relatorio) => {
                try {
                    let blob = await MinioService.download({
                        objectName: relatorio.nome,
                        bucket: process.env.NEXT_PUBLIC_API_NAMEDIDA,
                    });
                    blob = new Blob([blob], { type: 'application/pdf' });
                    save(blob, `${relatorio.nome}.pdf`);
                } catch (error) {
                    
                }
            } 
        },

      ];

    const tableHeaders = ["CÓD", "STATUS", "NOME", "DATA ENVIO", "ENVIADO POR"];

    const toggleActivationFunction = async (element: any) => {
        try {
            await Rela.toggleStatusEscola(element?.id).then(
                fetchEscolas
            );
        } catch (error) {
            console.log(error?.message);
            notifications.show({ title: 'Erro ao desativar!', message: error?.message, position: 'bottom-left', color: 'red' })
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
                        Relatórios
                    </Text>}
            >
                <Divider size="xs" />

                <DataTable
                    headerElements={tableHeaders}
                    elements={relatoriosList}
                    additionalButtons={additionalButtons}
                />
            </Modal>
        </>
    );
}