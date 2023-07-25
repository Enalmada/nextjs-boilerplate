'use client';

import { Suspense } from 'react';
import { TASKS } from '@/client/gql/queries-mutations';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import Task from './Task';

export default function TaskList() {
  const { data, error } = useSuspenseQuery(TASKS);

  if (!data) return null;
  if (error) return <div>{`Error! ${error.message}`}</div>;

  const tasks = [...data.tasks].sort((a, b) => {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return (
    <div className="grid grid-cols-1 gap-2">
      <Suspense>
        {tasks.map((task) => {
          return <Task task={task} key={task.id} />;
        })}
      </Suspense>
    </div>
  );
}
