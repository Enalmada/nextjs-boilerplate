import { PageContent } from '@/app/[locale]/(app)/app/PageContent';
import { TaskListLoading } from '@/client/components/tasks/TaskList';

export default function Loading() {
  return (
    <PageContent>
      <TaskListLoading />
    </PageContent>
  );
}
