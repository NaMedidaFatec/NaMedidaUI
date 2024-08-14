'use client';
import {
    Paper,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
    Image,
} from '@mantine/core';

export default function Login() {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Paper radius={0} px={30} w='40vw' >
                <Title order={2} ta="center" mt="md" mb={50}>
                    Welcome back to Mantine!
                </Title>

                <TextInput label="Email address" placeholder="hello@gmail.com" size="md" />
                <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" />
                <Checkbox label="Keep me logged in" mt="xl" size="md" />
                <Button fullWidth mt="xl" size="md">
                    Login
                </Button>

                <Text ta="center" mt="md">
                    Don't have an account?{' '}
                    <Anchor href="#" fw={700}>
                        Register
                    </Anchor>
                </Text>
            </Paper>

            <Image
                fit='fill'
                w='auto'
                maw='60vw'
                h='100vh'
                src="/loginImage.png" />
        </div>


    );
}