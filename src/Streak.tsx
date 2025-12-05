import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where, orderBy } from 'firebase/firestore';
import type { FirestoreDataConverter } from 'firebase/firestore';
import { auth, db } from './firebase';
import { Text, Paper, Group, Stack } from '@mantine/core';
import { IconFlame } from '@tabler/icons-react';
import { useMemo } from 'react';

interface Session {
  id: string;
  timestamp: Date;
}

const sessionConverter: FirestoreDataConverter<Session> = {
  toFirestore: (session: Session) => ({
    timestamp: session.timestamp,
  }),
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return { id: snapshot.id, timestamp: data.timestamp.toDate() };
  },
};

export function Streak() {
  const [user] = useAuthState(auth);

  const sessionsQuery = user
    ? query(
        collection(db, 'sessions'),
        where('uid', '==', user.uid),
        orderBy('timestamp', 'desc')
      ).withConverter(sessionConverter)
    : null;

  const [sessions] = useCollection(sessionsQuery);

  const currentStreak = useMemo(() => {
    if (!sessions || sessions.docs.length === 0) {
      return 0;
    }

    let streak = 0;
    let lastDate: Date | null = null;

    for (const doc of sessions.docs) {
      const session = doc.data() as Session;
      const sessionDate = new Date(
        session.timestamp.getFullYear(),
        session.timestamp.getMonth(),
        session.timestamp.getDate()
      );

      if (lastDate) {
        const diffTime = lastDate.getTime() - sessionDate.getTime();
        const diffDays = diffTime / (1000 * 3600 * 24);

        if (diffDays === 1) {
          streak++;
        } else if (diffDays > 1) {
          break;
        }
      }
      lastDate = sessionDate;
    }

    // Check if the most recent session was yesterday or today
    if (lastDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const diffTime = today.getTime() - lastDate.getTime();
      const diffDays = diffTime / (1000 * 3600 * 24);
      if (diffDays <= 1) {
        streak++;
      }
    }

    return streak;
  }, [sessions]);

  return (
    <Paper withBorder p="xl" radius="md">
      <Group>
        <IconFlame size={64} color="grape" />
        <Stack gap="xs">
          <Text size="xl" fw={700} c="grape.3">
            Current Streak
          </Text>
          <Text size="4rem" fw={900} c="grape.5">
            {currentStreak}
          </Text>
          <Text size="lg" c="dimmed">
            days
          </Text>
        </Stack>
      </Group>
    </Paper>
  );
}
