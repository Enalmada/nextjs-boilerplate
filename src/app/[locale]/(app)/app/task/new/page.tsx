import TaskForm from '@/client/components/tasks/TaskForm';
import { Breadcrumb } from '@/client/ui';
import { getRouteById } from '@/client/utils/routes';

export const metadata = {
  title: 'New Task',
};

export default function Page() {
  return (
    <>
      <Breadcrumb routes={[getRouteById('Home'), getRouteById('NewTask')]} />
      <TaskForm />
    </>
  );
}
