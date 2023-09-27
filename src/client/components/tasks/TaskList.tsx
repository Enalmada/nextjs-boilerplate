'use client';

import { type MyTasksQuery, type Task } from '@/client/gql/generated/graphql';
import { MY_TASKS } from '@/client/gql/queries-mutations';
import { Card, CardBody } from '@/client/ui';
import { useQuery } from '@urql/next';

import TaskRender, { TaskBody } from './Task';

export const dynamic = 'force-dynamic';

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
  const [{ data, fetching, error }] = useQuery<MyTasksQuery>({ query: MY_TASKS });

  if (error) return <div>{`Error! ${error?.message}`}</div>;
  if (!data && fetching) return null;

  // TODO this should be sorted on server and paginated
  const tasks: Task[] = [...(data?.me?.tasks as Task[])].sort((a, b) => {
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
        return <TaskRender task={task} key={task.id} />;
      })}
    </div>
  );
}
