import { useState } from 'react';
import { List, Text, TextInput, Button, Group, ActionIcon, Paper, NumberInput, ThemeIcon } from '@mantine/core';
import { IconTrash, IconCheck } from '@tabler/icons-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  uid: string;
  duration: number; // in minutes
  remainingTime: number; // in seconds
}

interface TodoListProps {
  onSelectTodo: (todo: Todo) => void;
}

const formatTime = (time: number) => {
  if (time <= 0) return '00:00';
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};


export function TodoList({ onSelectTodo }: TodoListProps) {
  const [user] = useAuthState(auth);
  const [newTodo, setNewTodo] = useState('');
  const [duration, setDuration] = useState<number | string>(25);

  const [todos, loading, error] = useCollection(
    user ? collection(db, 'users', user.uid, 'todos') : null
  );

  const addTodo = async () => {
    if (newTodo.trim() === '' || !user || !duration) return;
    const taskDuration = typeof duration === 'string' ? parseInt(duration, 10) : duration;
    await addDoc(collection(db, 'users', user.uid, 'todos'), {
      text: newTodo,
      completed: false,
      uid: user.uid,
      duration: taskDuration, // stored in minutes
      remainingTime: taskDuration * 60, // stored in seconds
    });
    setNewTodo('');
    setDuration(25);
  };

  const deleteTodo = async (id: string) => {
    if (!user) return;
    const todoDoc = doc(db, 'users', user.uid, 'todos', id);
    await deleteDoc(todoDoc);
  };

  if (!user) {
    return null;
  }

  const uncompletedTodos = todos?.docs.filter(doc => !doc.data().completed) || [];
  const completedTodos = todos?.docs.filter(doc => doc.data().completed) || [];

  return (
    <Paper withBorder p="xl" radius="md">
      <Text size="xl" fw={700} mb="md">
        Todo List
      </Text>
      <Group mb="md">
        <TextInput
          placeholder="Add a new task"
          value={newTodo}
          onChange={(event) => setNewTodo(event.currentTarget.value)}
          style={{ flex: 1 }}
        />
        <NumberInput 
          value={duration}
          onChange={setDuration}
          placeholder="Mins"
          min={1}
          max={120}
          w={70}
        />
        <Button onClick={addTodo} color="grape">Add</Button>
      </Group>
      {loading && <Text>Loading...</Text>}
      {error && <Text c="red">Error: {error.message}</Text>}
      
      <Text c="dimmed" size="sm" mb="xs">Tasks</Text>
      <List listStyleType="none" spacing="sm">
        {uncompletedTodos.map((todoDoc) => {
          const todo = { id: todoDoc.id, ...todoDoc.data() } as Todo;
          return (
            <List.Item key={todo.id}>
              <Paper withBorder radius="md" p="xs" onClick={() => onSelectTodo(todo)} style={{cursor: 'pointer'}}>
                <Group justify="space-between">
                  <Text>{todo.text}</Text>
                  <Text size="sm" c="dimmed">{formatTime(todo.remainingTime)}</Text>
                </Group>
              </Paper>
            </List.Item>
          );
        })}
      </List>

      {completedTodos.length > 0 && (
        <>
          <Text c="dimmed" size="sm" mt="lg" mb="xs">Completed</Text>
          <List listStyleType="none" spacing="sm">
            {completedTodos.map((todoDoc) => {
              const todo = { id: todoDoc.id, ...todoDoc.data() } as Todo;
              return (
                <List.Item key={todo.id}>
                  <Paper radius="md" p="xs">
                    <Group justify="space-between">
                      <Group>
                        <ThemeIcon color="grape" radius="xl"><IconCheck size={16}/></ThemeIcon>
                        <Text td='line-through' c='dimmed'>
                          {todo.text}
                        </Text>
                      </Group>
                      <ActionIcon c="red" size="sm" onClick={() => deleteTodo(todo.id)} variant="transparent">
                        <IconTrash size={20} />
                      </ActionIcon>
                    </Group>
                  </Paper>
                </List.Item>
              );
            })}
          </List>
        </>
      )}
    </Paper>
  );
}
