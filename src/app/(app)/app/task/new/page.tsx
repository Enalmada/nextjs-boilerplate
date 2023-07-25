import BreadCrumb from '@/client/components/Breadcrumb';
import TaskForm from '@/client/components/tasks/TaskForm';
import { getRouteById } from '@/client/utils/routes';

export const metadata = {
  title: 'New Task',
};

export default function Page() {
  return (
    <>
      <BreadCrumb routes={[getRouteById('Home'), getRouteById('NewTask')]} />
      <TaskForm />
    </>
  );
}
