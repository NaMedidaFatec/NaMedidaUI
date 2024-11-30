"use client";

import React, { useEffect, useState } from "react";
import { withFormik } from "formik";
import UserValidation from "../../../validations/login";
import { User } from "../../../model/user";
import UserService from "../../../services/user";
import { Button } from "../../../components/general";
import { useUpdateTitle } from "../../../hooks/useTitle";
import { Grid, Box } from "@mantine/core";
import { IconCubePlus, IconFileInfo, IconPlus } from "@tabler/icons-react";
import ClearableInput from "../../../components/general/ClearableInput";
import DataTable from "../../../components/general/DataTable";
import ModalDetalhePedido from "../../../components/Modals/ModalDetalhePedido";
import { useDisclosure } from "@mantine/hooks";
import ModalCadastroPedido from "../../../components/Modals/ModalCadastroPedido";
import ModalCadastroPedidoItens from "../../../components/Modals/ModalCadastroPedidoItens";
import RequisicaoService from "../../../services/general/requisicao";
import ModalDataTableSimples from "../../../components/Modals/ModalDataTableSimples";

function Pedido(props: any) {
  const updateTitle = useUpdateTitle();

  useEffect(() => {
    updateTitle('Meus Pedidos')
    fetchPedidos();
  }, [])

  const [pedidos, setPedidos] = useState([]);
  const [filteredPedidos, setFilteredPedidos] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [selectedPedidoId, setSelectedPedidoId] = useState(0);


  const [openedDetalhe, handlers] = useDisclosure(false);
  const [openedCadastroItens, { open, close }] = useDisclosure(false);
  const [isOpenedCadastro, setOpenedCadastro] = useState(false);

  const tableHeaders = ["CÓD", "DATA PEDIDO", "ÚLTIMA ATT.", "SITUAÇÃO", "OBS.", "MOTIVO CANCELAMENTO"];

  const fetchPedidos = async () => {
    try {
      const pedidos = await RequisicaoService.fetchAll();
      const pedidosList = pedidos?.content?.map(pedido => ({
        id: pedido?.id,
        dataCriacao: pedido?.createdAt,
        ultimaAtualizacao: pedido?.updatedAt,
        situacao: pedido?.observacoesCancelamento ? "CANCELADO"
          : (pedido?.finalizada ? "FINALIZADO" : "EM ANDAMENTO"),
        observacoes: pedido?.observacoes,
        observacoesCancelamento: pedido?.observacoesCancelamento,
      }));

      setPedidos(pedidosList);
      setFilteredPedidos(pedidosList);
    } catch (error) {
      console.error(error?.message);
    }
  }

  useEffect(() => {
    search();
  }, [searchField])

  const search = async () => {
    if (pedidos && searchField) {
      const filtered = pedidos.filter(filterLista);
      setFilteredPedidos(filtered);
    } else {
      setFilteredPedidos(pedidos);
    }
  };

  const filterLista = (item) => {
    const regex = new RegExp(searchField, 'ig');
    return (
      regex.test(item.id) ||
      regex.test(item.ultimaAtualizacao) ||
      regex.test(item.dataCriacao) ||
      regex.test(item.observacoesCancelamento) ||
      regex.test(item.situacao)
    );
  };

  const openCadastroItensModal = (id: any) => {
    setSelectedPedidoId(id);
    open();
  };

  const openDetail = (id: any) => {
    setSelectedPedidoId(id);
    handlers?.open()
  };

  const additionalButtons = [
    {
      id: 1,
      icon: <IconCubePlus />,
      onClick: (element: any) => openCadastroItensModal(element?.id)
    },
    {
      id: 2,
      icon: <IconFileInfo />,
      onClick: (element: any) => openDetail(element?.id)
    },
  ];

  return (
    <>
      <ModalDataTableSimples open={openedDetalhe} close={() => handlers?.close()} refeicaoId={selectedPedidoId}/>

      <ModalCadastroPedido open={isOpenedCadastro} close={() => setOpenedCadastro(false)} fetchPedidos={fetchPedidos} />

      <ModalCadastroPedidoItens open={openedCadastroItens} close={close} pedidoId={selectedPedidoId} fetchPedidos={fetchPedidos} />

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
            <Button h='4rem' w='4rem' onClick={() => setOpenedCadastro(true)} variant="gradient" style={{ borderRadius: '10rem' }}>
              <IconPlus size={23} />
            </Button>
          </Grid.Col>
        </Grid>

        <DataTable headerElements={tableHeaders} elements={filteredPedidos} additionalButtons={additionalButtons} />

      </Box>
    </>
  );
}

export default withFormik({
  validateOnChange: false,
  validateOnBlur: false,
  mapPropsToValues: () => new User(),
  validationSchema: UserValidation,
  handleSubmit: async (values: User, { setStatus }) => {
    const result = await UserService.signin(new User(values));
    if (result) {
      setStatus(true);
    }
  },
})(Pedido);
