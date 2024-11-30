import { Divider, Grid, Group, Input, Modal, Text, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX, IconPdf, IconFileExport, IconChevronDown } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE, MS_EXCEL_MIME_TYPE, PDF_MIME_TYPE } from '@mantine/dropzone';
import { useEffect, useState } from 'react';
import RequisicaoService from '../../../services/general/requisicao';
import { notifications } from '@mantine/notifications';
import { saveAs } from 'file-saver';

interface ModalDropzoneProps extends Partial<DropzoneProps> {
    open?: boolean;
    close?: () => void;
}


export default function ModalDropzone({ open, close, onDrop = () => {}, onReject = () => {}, ...props }: ModalDropzoneProps) {
  const [requisicoes, setRequisicoes] = useState([]);

  useEffect(() => {
    fetchPedidos();
  }, []);


  const fetchPedidos = async () => {
    try {
      const pedidos = await RequisicaoService.fetchAll();
      setRequisicoes(pedidos?.content);
    } catch (error) {
      console.log(error?.message);
      notifications.show({
        title: "Erro ao buscar os pedidos!",
        message: error?.message,
        position: "bottom-left",
        color: "red",
      });
    }
  };


    return (
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
                    Relatório
                </Text>}
        >
            <Divider size="xs" />

            <Grid align="center">
                <Grid.Col span={12}>
                <Input.Wrapper label={"Pedido"} required>
                    <Input
                    component="select"
                    name="estoque"
                    // value={formData?.estoque}
                    onChange={async e => {
                        const {  value: id } = e?.target;
                        let blob = await RequisicaoService.downloadRelatorioExcel(id);
                        blob = new Blob([blob], { type: 'application/vnd.ms-excel' });
                        saveAs(blob, `relatorio-${id}.xls`);
                        notifications.show({ title: 'Download realizado com sucesso', message: '', position: 'bottom-left', color: 'blue' });
                    }}
                    rightSection={<IconChevronDown size={14} stroke={1.5} />}
                    pointer
                    >
                    <option
                        defaultValue=""
                        selected
                    >
                        Selecione o pedido para gerar o relatório
                    </option>
                    {requisicoes.map((requisicao) => (
                        <option key={requisicao?.id} value={Number(requisicao?.id)}>
                        {requisicao?.id} - {requisicao?.observacoes}
                        </option>
                    ))}
                    </Input>
                </Input.Wrapper>
                </Grid.Col>
            </Grid>

            <Divider size="xs" my='md' />

            <Dropzone
                h='30vh'
                loading={false}
                onDrop={onDrop}
                onReject={onReject}
                // onDrop={(files) => console.log('accepted files', files)}
                // onReject={(files) => console.log('rejected files', files)}
                maxSize={5 * 1024 ** 2}
                accept={{PDF_MIME_TYPE, MS_EXCEL_MIME_TYPE}}
                {...props}
            >
                <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <IconUpload
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconFileExport
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Idle>

                    <div>
                        <Text size="xl" inline>
                            Arraste o relatório em PDF, ou clique aqui para enviar o relatório.
                        </Text>
                        <Text size="sm" c="dimmed" inline mt={7}>
                            O tamanho do item não deve exceder 5mb
                        </Text>
                    </div>
                </Group>
            </Dropzone>
        </Modal>
    );
}