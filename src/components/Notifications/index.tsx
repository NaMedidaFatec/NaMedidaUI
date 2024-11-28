import { Drawer, Notification, Text } from '@mantine/core';
import { useState } from 'react';

interface ComponentProps {
    open?: boolean;
    close?: () => void;
}

interface NotificationContent {
    id: number;
    mensagem: string;
    horario: string;
    visto: boolean;
}

const initialContent: NotificationContent[] = [
    { id: 1, mensagem: 'oi', horario: '08:00', visto: false },
    { id: 2, mensagem: 'oi', horario: '08:00', visto: false },
    { id: 3, mensagem: 'oi', horario: '08:00', visto: false }
];

export default function ModalNotifications({ open, close }: ComponentProps) {
    const [content, setContent] = useState<NotificationContent[]>(initialContent);

    const handleNotificationClose = (id: number) => {
        setContent((prevContent) => prevContent.filter((message) => message.id !== id));
    };

    return (
        <Drawer
            opened={open}
            onClose={close}
            position='right'
            offset={20}
            radius="lg"
            title={<Text size='xl' fw={900}> Notificações</Text>}
        >
            {content.map((message) => (
                <Notification
                    key={message.id}
                    title={message.horario}
                    closeButtonProps={{ 'aria-label': 'Hide notification' }}
                    mt='md'
                    onClose={() => handleNotificationClose(message.id)}
                >
                    {message.mensagem}
                </Notification>
            ))}
        </Drawer>
    );
}
