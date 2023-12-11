import React from 'react';
import { Breadcrumb } from '@/client/ui';
import { getRouteById } from '@/client/utils/routes';

import { TaskTable } from './TaskTable';

export const metadata = {
  title: 'Tasks',
};

export default function Page() {
  return (
    <>
      <Breadcrumb routes={[getRouteById('AdminHome'), getRouteById('AdminTasks')]} />
      <TaskTable />
    </>
  );
}
