import { useState } from 'react';
import { AppShell, Grid } from '@mantine/core';
import { AppHeader } from './Header';
import { Pomodoro } from './Pomodoro';
import { TodoList } from './TodoList';
import type { Todo } from './TodoList';
import { Streak } from './Streak';
import { Heatmap } from './Heatmap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebase';
import { doc, updateDoc } from 'firebase/firestore';

function App() {
  const [user] = useAuthState(auth);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleTimerUpdate = async (remainingTime: number) => {
    if (user && selectedTodo) {
      const todoDoc = doc(db, 'users', user.uid, 'todos', selectedTodo.id);
      await updateDoc(todoDoc, { remainingTime });
    }
  };

  const handleTimerComplete = async () => {
    if (user && selectedTodo) {
      const todoDoc = doc(db, 'users', user.uid, 'todos', selectedTodo.id);
      await updateDoc(todoDoc, { completed: true, remainingTime: 0 });
      setSelectedTodo(null);
    }
  };

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
    >
      <AppHeader />
      <AppShell.Main>
        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Streak />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Pomodoro 
              selectedTodo={selectedTodo}
              onTimerUpdate={handleTimerUpdate}
              onTimerComplete={handleTimerComplete}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TodoList onSelectTodo={handleSelectTodo} />
          </Grid.Col>
          <Grid.Col span={12}>
            <Heatmap />
          </Grid.Col>
        </Grid>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
