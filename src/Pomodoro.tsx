
import { useState, useEffect } from 'react';
import { RingProgress, Text, Paper, Group, ActionIcon, Stack } from '@mantine/core';
import { IconPlayerPlay, IconPlayerPause, IconRefresh } from '@tabler/icons-react';
import type { Todo } from './TodoList';

interface PomodoroProps {
  selectedTodo: Todo | null;
  onTimerUpdate: (remainingTime: number) => void;
  onTimerComplete: () => void;
}

export function Pomodoro({ selectedTodo, onTimerUpdate, onTimerComplete }: PomodoroProps) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    if (selectedTodo) {
      setTimeLeft(selectedTodo.remainingTime);
      setTotalDuration(selectedTodo.duration * 60);
      setIsActive(false);
    } else {
      setTimeLeft(25 * 60);
      setTotalDuration(25 * 60);
    }
  }, [selectedTodo]);

  useEffect(() => {
    let interval: number | undefined = undefined;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        const newTimeLeft = timeLeft - 1;
        setTimeLeft(newTimeLeft);
        onTimerUpdate(newTimeLeft);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      onTimerComplete();
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onTimerUpdate, onTimerComplete]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    if (selectedTodo) {
      setIsActive(!isActive);
    }
  };

  const resetTimer = () => {
    if(selectedTodo) {
      setIsActive(false);
      setTimeLeft(selectedTodo.duration * 60);
      onTimerUpdate(selectedTodo.duration * 60);
    }
  };

  const progress = totalDuration > 0 ? (timeLeft / totalDuration) * 100 : 0;

  return (
    <Paper withBorder p="xl" radius="md">
      <Stack align="center">
        <Text size="xl" fw={700} c="cyan.2">
          {selectedTodo ? selectedTodo.text : 'Select a Task'}
        </Text>
        <RingProgress
          size={220}
          thickness={12}
          roundCaps
          sections={[{ value: 100 - progress, color: 'cyan' }]}
          rootColor="#2C2E33"
          label={
            <Text c="cyan.3" fw={700} ta="center" size="3rem">
              {formatTime(timeLeft)}
            </Text>
          }
        />
        <Group justify="center" mt="xl">
          <ActionIcon size="xl" radius="xl" variant="filled" color="cyan" onClick={toggleTimer} disabled={!selectedTodo}>
            {isActive ? <IconPlayerPause size={32} /> : <IconPlayerPlay size={32} />}
          </ActionIcon>
          <ActionIcon size="xl" radius="xl" variant="outline" color="gray" onClick={resetTimer} disabled={!selectedTodo}>
            <IconRefresh size={32} />
          </ActionIcon>
        </Group>
      </Stack>
    </Paper>
  );
}
