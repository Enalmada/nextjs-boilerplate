import { Suspense } from 'react';
import TaskForm from '@/client/components/tasks/TaskForm';
import { Breadcrumb } from '@/client/ui';
import { getRouteById } from '@/client/utils/routes';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    id: string;
  };
}

export const metadata = {
  title: 'Task',
};

export default function Page(props: Props) {
  const id = props.params.id;
  return (
    <>
      <Breadcrumb routes={[getRouteById('Home'), getRouteById('Task')]} />

      <Suspense>
        <TaskForm id={id} />
      </Suspense>
    </>
  );
}
