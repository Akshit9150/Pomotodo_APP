
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@mantine/core/styles.css';
import { MantineProvider, createTheme, Loader, Center } from '@mantine/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { Auth } from './pages/Auth';

const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  primaryColor: 'grape',
  defaultColorScheme: 'dark',
});

function Root() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader color="grape" />
      </Center>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Root />
    </MantineProvider>
  </React.StrictMode>,
);
