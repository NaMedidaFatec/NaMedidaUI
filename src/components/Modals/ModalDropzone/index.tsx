import { Group, Modal, Text, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX, IconPdf, IconFileExport } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE, PDF_MIME_TYPE } from '@mantine/dropzone';

interface ModalDropzoneProps extends Partial<DropzoneProps> {
    open?: boolean;
    close?: () => void;
}


export default function ModalDropzone({ open, close, ...props }: ModalDropzoneProps) {
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
        >
            <Dropzone
                h='30vh'
                loading={false}
                onDrop={(files) => console.log('accepted files', files)}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={5 * 1024 ** 2}
                accept={PDF_MIME_TYPE}
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
                            Arraste o relatório em PDF, ou clique aqui.
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