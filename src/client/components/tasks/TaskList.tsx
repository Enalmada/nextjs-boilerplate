'use client';

import { TASKS } from '@/client/gql/queries-mutations';
import { Card, CardBody } from '@/client/ui';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import Task, { TaskBody } from './Task';

export const TaskListLoading = () => {
  return (
    <div className="grid grid-cols-1 gap-2">
      <TaskBody />
      <TaskBody />
      <TaskBody />
    </div>
  );
};

const EmptyState = () => {
  return (
    <Card>
      <CardBody>
        <div className="p-10 text-center">No Items</div>
      </CardBody>
    </Card>
  );
};

export default function TaskList() {
  const { data, error } = useSuspenseQuery(TASKS);

  if (error) return <div>{`Error! ${error?.message}`}</div>;
  if (!data) return null;

  // TODO this should be sorted on server and paginated
  const tasks = [...data.tasks].sort((a, b) => {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 gap-2">
      {tasks.map((task) => {
        return <Task task={task} key={task.id} />;
      })}
    </div>
  );
}
