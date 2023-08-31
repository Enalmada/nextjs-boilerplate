import React from 'react';
import { PageContent } from '@/app/[locale]/(app)/app/PageContent';
import TaskList from '@/client/components/tasks/TaskList';

export const metadata = {
  title: 'Tasks',
};

export default function Page() {
  return (
    <PageContent>
      <TaskList />
    </PageContent>
  );
}
