import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Paper, TextInput, PasswordInput, Button, Title, Text, Anchor, Center, Stack } from '@mantine/core';
import { Logo } from '../Logo';

export function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Center style={{ height: '100vh' }}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md" style={{ width: 400 }}>
        <Stack align="center" mb="xl">
          <Logo />
          <Title ta="center">{isLogin ? 'Welcome back!' : 'Create an account'}</Title>
        </Stack>
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          mt="md"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          mt="md"
        />
        {error && <Text c="red" size="sm" ta="center" mt="sm">{error}</Text>}
        <Button fullWidth mt="xl" onClick={handleSubmit} color="grape">
          {isLogin ? 'Sign in' : 'Sign up'}
        </Button>        
        <Text c="dimmed" size="sm" ta="center" mt="md">
          {isLogin ? 'Do not have an account?' : 'Already have an account?'}{' '}
          <Anchor size="sm" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign up' : 'Sign in'}
          </Anchor>
        </Text>
      </Paper>
    </Center>
  );
}
