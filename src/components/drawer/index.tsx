'use client'

import { Group, Code, NavLink, Stack } from '@mantine/core';
import {
    IconNotes,
    IconCalendarStats,
    IconGauge,
    IconPresentationAnalytics,
    IconFileAnalytics,
    IconAdjustments,
    IconLock,
} from '@tabler/icons-react';
import { Button, Container } from '../general';

const mockdata = [
    { label: 'Dashboard', icon: IconGauge },
    {
        label: 'Market news',
        icon: IconNotes,
        links: [
            { label: 'Overview', link: '/' },
            { label: 'Forecasts', link: '/' },
            { label: 'Outlook', link: '/' },
            { label: 'Real time', link: '/' },
        ],
    },
    {
        label: 'Releases',
        icon: IconCalendarStats,
        links: [
            { label: 'Upcoming releases', link: '/' },
            { label: 'Previous releases', link: '/' },
            { label: 'Releases schedule', link: '/' },
        ],
    },
    { label: 'Analytics', icon: IconPresentationAnalytics },
    { label: 'Contracts', icon: IconFileAnalytics },
    { label: 'Settings', icon: IconAdjustments },
    {
        label: 'Security',
        icon: IconLock,
        links: [
            { label: 'Enable 2FA', link: '/' },
            { label: 'Change password', link: '/' },
            { label: 'Recovery codes', link: '/' },
        ],
    },
];

export default function Drawer(props: any) {
    const links = mockdata.map((item) => <NavLink style={{ padding: '1rem' }} {...item} key={item.label} />);

    return (
        <Container fluid h='100vh' w='12vw' mx='0' px='0' style={{ alignItems: 'flex-start' }}>
            <Group h='7.5%' w='100%' justify="space-between" style={{ borderBottom: '1px solid #dee2e6' }}>
                {/* <Logo style={{ width: rem(120) }} /> */}
                <Code fw={700}>v3.1.2</Code>
            </Group>

            <Stack
                bg="var(--mantine-color-body)"
                align="stretch"
                justify="flex-start"
                gap="md"
                h='85%'
                style={{ overflow: 'scroll' }}
            >
                {links}
            </Stack>

            <Group h='7.5%' w='100%' justify="space-between" style={{ borderTop: '1px solid #dee2e6' }}>
                {/* <Logo style={{ width: rem(120) }} /> */}
                <Code fw={700}>v3.1.2</Code>
            </Group>
        </Container>
    )
};
