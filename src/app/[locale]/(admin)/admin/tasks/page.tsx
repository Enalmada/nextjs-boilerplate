import React from 'react';
import { Breadcrumb } from '@/client/ui';
import { getRouteById } from '@/client/utils/routes';

import { TaskList } from './TaskList';

export const metadata = {
  title: 'Tasks',
};

export default function Page() {
  return (
    <div className="mx-auto my-5 flex w-full max-w-[95rem] flex-col gap-4">
      <Breadcrumb routes={[getRouteById('AdminHome'), getRouteById('AdminTasks')]} />
      <TaskList />
    </div>
  );
}
