import BreadCrumb from '@/client/components/Breadcrumb';
import PageLayout from '@/client/components/layout/PageLayout';
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
    <PageLayout>
      <BreadCrumb routes={[getRouteById('Home'), getRouteById('Task')]} />
      <TaskForm id={id} />
    </PageLayout>
  );
}
