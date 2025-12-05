import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';
import { auth, db } from './firebase';
import CalendarHeatmap from 'react-calendar-heatmap';
import './heatmap.css';
import { subMonths } from 'date-fns';
import { Paper, Text } from '@mantine/core';

interface Session {
  uid: string;
  timestamp: Date;
}

export function Heatmap() {
  const [user] = useAuthState(auth);

  const sixMonthsAgo = subMonths(new Date(), 6);

  const sessionsQuery = user
    ? query(collection(db, 'sessions'), where('uid', '==', user.uid))
    : null;

  const [sessions] = useCollection(sessionsQuery);

  const heatmapData = sessions?.docs
    .map((doc) => {
      const data = doc.data() as Session;
      return {
        date: new Date(data.timestamp),
      };
    })
    .filter(session => session.date > sixMonthsAgo)
    .reduce((acc: { [key: string]: { date: Date; count: number } }, session) => {
      const dateStr = session.date.toISOString().slice(0, 10);
      if (!acc[dateStr]) {
        acc[dateStr] = { date: session.date, count: 0 };
      }
      acc[dateStr].count++;
      return acc;
    }, {});

  const values = heatmapData ? Object.values(heatmapData) : [];

  return (
    <Paper withBorder p="xl" radius="md">
      <Text size="xl" fw={700} mb="md" c="cyan.2">Contribution</Text>
      <CalendarHeatmap
        startDate={sixMonthsAgo}
        endDate={new Date()}
        values={values}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-scale-${Math.min(value.count, 4)}`;
        }}
        showWeekdayLabels
      />
    </Paper>
  );
}
