"use client";

import {
  Pagination,
  Text,
  Box,
  Button,
  Grid,
  Paper,
  useComputedColorScheme,
  Input,
} from "@mantine/core";
import DataTable from "../../../components/general/DataTable";
import ClearableInput from "../../../components/general/ClearableInput";
import { withFormik } from "formik";
import { IconPlus, IconUpload, IconDownload, IconChevronDown } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useUpdateTitle } from "../../../hooks/useTitle";
import { useDisclosure } from "@mantine/hooks";
import ModalDropzone from "../../../components/Modals/ModalDropzone";
import MinioService from "../../../services/general/minio";
import RelatorioService from "../../../services/general/relatorio";
import { notifications } from "@mantine/notifications";
import save from "save-file";


function Relatoriosrelatorio(props: any) {
  const updateTitle = useUpdateTitle();

  useEffect(() => {
    updateTitle("Meus Relatórios");
    fetchRelatorios();
  }, []);

  const [searchField, setSearchField] = useState("");
  const [relatorios, setRelatorios] = useState([]);

  const [opened, { open, close }] = useDisclosure(false);

  const [filter, setFilter] = useState({
    codigo: 1,
    dataInicial: "2024-01-01",
    dataFinal: "2024-12-12",
  });
    const tableHeaders = ["CÓD", "NOME", "DATA ENVIO", "ENVIADO POR"];

  const additionalButtons = [
    {
        id: 1,
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

  const fetchRelatorios = async () => {
    const relatorios = await RelatorioService.fetchAllRelatorios();
    const relatoriosList = relatorios?.content?.map((relatorio) => ({
      id: relatorio?.id,
      nome: relatorio?.nome,
      dataDeEnvio: relatorio?.dataDeEnvio,
      enviadoPor: relatorio?.enviadoPor?.nome,
    }));
    setRelatorios(relatoriosList);
  };

  return (
    <>
      <ModalDropzone
        open={opened}
        close={close}
        onDrop={async (files) => {
          try {
            const file = files[0];

            await RelatorioService.createRelatorio({
              nome: file.name,
            });

            let formData = new FormData();
            formData.append(
              "documento",
              JSON.stringify({
                bucket: "namedida",
                objectName: file.name,
                file: {
                  fileName: file.name,
                  contentType: file.type,
                },
              })
            );
            formData.append("file", file, file.name);
            await MinioService.upload(formData);
            notifications.show({
              title: "Relatório salvo com sucesso",
              message: "",
              position: "bottom-left",
              color: "blue",
            });

            close();
            fetchRelatorios();
          } catch (error) {
            notifications.show({
              title: "Erro ao salvar relatório",
              message: error?.message,
              position: "bottom-left",
              color: "red",
            });
          }
        }}
      />
      <Box w="100%" h="89vh" display="flex" style={{ flexDirection: "column" }}>
        <Grid h="auto" mt="1rem">
          <Grid.Col span={6}>
            <ClearableInput
              placeholder="Pesquisar"
              label="Pesquisar"
              value={searchField}
              setValue={setSearchField}
            />
          </Grid.Col>
          <Grid.Col
            span={3}
            offset={3}
            display="flex"
            style={{ justifyContent: "flex-end" }}
          >
            <Button
              h="4rem"
              w="4rem"
              variant="gradient"
              onClick={open}
              style={{ borderRadius: "10rem" }}
            >
              <IconPlus size={23} />
            </Button>
          </Grid.Col>
        </Grid>

        <DataTable
          headerElements={tableHeaders}
          elements={relatorios}
          additionalButtons={additionalButtons}
        />
      </Box>
    </>
  );
}

export default withFormik({
  validateOnChange: false,
  validateOnBlur: false,
  handleSubmit: () => 1,
})(Relatoriosrelatorio);