
import { AppShell, Title, Button } from '@mantine/core';
import { auth } from './firebase';

export function AppHeader() {

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <AppShell.Header p="xs" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1A1B1E', borderBottom: '1px solid #2C2E33' }}>
      <Title order={3} style={{ color: 'white' }}>Pomodoro + Todo</Title>
      <Button onClick={handleLogout} variant="outline" color="red">
        Logout
      </Button>
    </AppShell.Header>
  );
}
