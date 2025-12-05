import { AppShell, Button, Group } from '@mantine/core';
import { auth } from './firebase';
import { Logo } from './Logo';

export function AppHeader() {

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <AppShell.Header p="md">
      <Group justify="space-between">
        <Logo />
        <Button onClick={handleLogout} variant="light" color="grape">
          Logout
        </Button>
      </Group>
    </AppShell.Header>
  );
}
