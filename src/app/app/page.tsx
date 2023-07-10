import Link from 'next/link';
import BreadCrumb from '@/client/components/Breadcrumb';
import PageLayout from '@/client/components/layout/PageLayout';
import TaskList from '@/client/components/tasks/TaskList';
import { getRouteById } from '@/client/utils/routes';

export const metadata = {
  title: 'Tasks',
};

export default function Page() {
  return (
    <PageLayout>
      <BreadCrumb routes={[getRouteById('Home')]} />

      <div>
        <div className="my-2 w-full text-center text-2xl font-bold leading-tight text-gray-800">
          Task Manager
        </div>
        <div className="mb-4 w-full">
          <div className="gradient mx-auto my-0 h-1 w-64 rounded-t py-0 opacity-25"></div>
        </div>
      </div>

      <div className={'mb-6 text-center'}>
        <Link href={getRouteById('NewTask').path}>
          <button className="rounded bg-purple-600 px-20 py-2 text-center font-bold text-white shadow-lg transition duration-200 hover:bg-purple-700 hover:shadow-xl">
            New Task
          </button>
        </Link>
      </div>

      <TaskList />
    </PageLayout>
  );
}
