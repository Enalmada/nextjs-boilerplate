'use client';

import { type MyTasksQuery, type Task } from '@/client/gql/generated/graphql';
import { MY_TASKS } from '@/client/gql/queries-mutations';
import { Card, CardBody } from '@/client/ui';
import { useQuery } from '@enalmada/next-gql/client';

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
  const [{ data, error }] = useQuery<MyTasksQuery>({ query: MY_TASKS });

  if (error) return <div>{`Error! ${error?.message}`}</div>;

  // It is possible for tasks to be null until it is populated to to ME query not calling it
  if (!data?.me?.tasks) return <TaskListLoading />;

  if (!data?.me?.tasks || data?.me?.tasks.length === 0) {
    return <EmptyState />;
  }

  // TODO this should be sorted on server and paginated
  const tasks: Task[] = [...(data?.me?.tasks as Task[])].sort((a, b) => {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return (
    <div className="grid grid-cols-1 gap-2">
      {tasks.map((task) => {
        return <TaskRender task={task} key={task.id} />;
      })}
    </div>
  );
}
