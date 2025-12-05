import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Paper, TextInput, PasswordInput, Button, Title, Text, Anchor } from '@mantine/core';

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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#101113' }}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md" style={{ width: 400 }}>
        <Title ta="center" c="cyan.2">{isLogin ? 'Login' : 'Sign Up'}</Title>
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          mt="md"
          styles={{ 
            label: { color: '#E9ECEF' }, 
            input: { 
              color: '#E9ECEF', 
              backgroundColor: '#2C2E33'
            } 
          }}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          mt="md"
          styles={{ 
            label: { color: '#E9ECEF' }, 
            input: { 
              color: '#E9ECEF', 
              backgroundColor: '#2C2E33'
            } 
          }}
        />
        {error && <Text c="red" size="sm" ta="center" mt="sm">{error}</Text>}
        <Button fullWidth mt="xl" onClick={handleSubmit} color="cyan">
          {isLogin ? 'Sign in' : 'Sign up'}
        </Button>        
        <Text c="dimmed" size="sm" ta="center" mt="md">
          {isLogin ? 'Do not have an account?' : 'Already have an account?'}{' '}
          <Anchor size="sm" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign up' : 'Sign in'}
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
