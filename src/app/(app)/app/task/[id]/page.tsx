import { Suspense } from 'react';
import BreadCrumb from '@/client/components/Breadcrumb';
import TaskForm from '@/client/components/tasks/TaskForm';
import { getRouteById } from '@/client/utils/routes';

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
      <BreadCrumb routes={[getRouteById('Home'), getRouteById('Task')]} />

      <Suspense>
        <TaskForm id={id} />
      </Suspense>
    </>
  );
}
