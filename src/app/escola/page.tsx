"use client";

import React, { useEffect, useState } from "react";
import { useUpdateTitle } from "../../hooks/useTitle";
import { IconCubePlus, IconFileInfo, IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import EscolaService from "../../services/escola";
import { Box, Button, Grid } from "@mantine/core";
import ClearableInput from "../../components/general/ClearableInput";
import DataTable from "../../components/general/DataTable";
import ModalCadastroRefeicao from "../../components/Modals/ModalCadastroRefeicao";
import ModalCadastroRefeicaoItens from "../../components/Modals/ModalCadastroRefeicaoItens";
import ModalDataTableSimples from "../../components/Modals/ModalDataTableSimples";

export default function InstituicaoEnsinoHomePage(props: any) {
  const updateTitle = useUpdateTitle();

  useEffect(() => {
    updateTitle('Refeições')
    fetchRefeicoes();
  }, [])

  const [refeicoes, setRefeicoes] = useState([]);
  const [filteredRefeicoes, setFilteredRefeicoes] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [selectedPedidoId, setSelectedPedidoId] = useState(0);


  const [openedCadastroRefeicao, { open, close }] = useDisclosure(false);
  const [openedCadastroRefeicaoItens, handlers] = useDisclosure(false);
  const [openedResponsavel, setOpenedResponsavel] = useState(false);

  const tableHeaders = ["CÓD", "NOME", "DESC.", "HORÁRIO DE DISPONIBILIDADE"];

  const fetchRefeicoes = async () => {
    try {
      const refeicoes = await EscolaService.fetchRefeicoes();
      const refeicoesList = refeicoes?.content?.map(refeicao => ({
        id: refeicao?.id,
        nome: refeicao?.nome,
        descricao: refeicao?.descricao,
        horarioDisponibilidade: refeicao?.horarioDisponibilidade?.slice(0, 5)
      }));

      setRefeicoes(refeicoesList);
      setFilteredRefeicoes(refeicoesList);

    } catch (error) {
      console.error(error?.message);
    }
  }

  useEffect(() => {
    search();
  }, [searchField])

  const search = async () => {
    if (refeicoes && searchField) {
      const filtered = refeicoes.filter(filterLista);
      setFilteredRefeicoes(filtered);
    } else {
      setFilteredRefeicoes(refeicoes);
    }
  };

  const filterLista = (item) => {
    const regex = new RegExp(searchField, 'ig');
    return (
      regex.test(item.id) ||
      regex.test(item.nome) ||
      regex.test(item.descricao) ||
      regex.test(item.horarioDisponibilidade)
    );
  };

  const openCadastroItensModal = (id: any) => {
    setSelectedPedidoId(id);
    handlers.open();
  };

  const openItensModal = (id: any) => {
    setSelectedPedidoId(id);
    setOpenedResponsavel(true);
  };

  const additionalButtons = [
    {
      id: 1,
      icon: <IconCubePlus />,
      onClick: (element: any) => openCadastroItensModal(element?.id)
    },
    {
      id: 2,
      icon: <IconFileInfo/>,
      onClick: (element: any) => openItensModal(element?.id)
    },
  ];


  return (
    <>
      <ModalDataTableSimples close={() => setOpenedResponsavel(false)} open={openedResponsavel} refeicaoId={selectedPedidoId} />

      <ModalCadastroRefeicao open={openedCadastroRefeicao} close={close} fetchRefeicoes={fetchRefeicoes} />

      <ModalCadastroRefeicaoItens open={openedCadastroRefeicaoItens} close={handlers.close} fetchRefeicoes={fetchRefeicoes} refeicaoId={selectedPedidoId} />

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
            <Button h='4rem' w='4rem' onClick={open} variant="gradient" style={{ borderRadius: '10rem' }}>
              <IconPlus size={23} />
            </Button>
          </Grid.Col>
        </Grid>

        <DataTable headerElements={tableHeaders} elements={filteredRefeicoes} additionalButtons={additionalButtons} />

      </Box>
    </>
  );
}
