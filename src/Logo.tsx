import { Text, Group } from '@mantine/core';

export function Logo() {
  return (
    <Group gap="xs">
      <Text size="xl" fw={900} variant="gradient" gradient={{ from: 'grape', to: 'pink', deg: 90 }}>
        Pomo
      </Text>
      <Text size="xl" fw={500}>
        todo
      </Text>
    </Group>
  );
}
