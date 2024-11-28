import { Drawer, Notification, Text } from '@mantine/core';
import NotificationService from '../../services/general/notifications';

interface ComponentProps {
    open?: boolean;
    close?: () => void;
    fetchNotificacoes?: () => void;
    notifications?: any[]
}

export default function ModalNotifications({ open, close, notifications, fetchNotificacoes }: ComponentProps) {

    const handleNotificationClose = async (id: number) => {
        try {
            await NotificationService.markSeen(id);
            setTimeout(() => {
                fetchNotificacoes();
            }, 200)
        } catch (error) {
            console.error(error?.message)
        }
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
            {notifications.map((message) => (
                <Notification
                    key={message.id}
                    title={message.horario}
                    closeButtonProps={{ 'aria-label': 'Hide notification' }}
                    mt='md'
                    onClose={() => handleNotificationClose(message?.id)}
                >
                    {message.mensagem}
                </Notification>
            ))}
        </Drawer>
    );
}
