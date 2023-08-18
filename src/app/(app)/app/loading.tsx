import { PageContent } from '@/app/(app)/app/PageContent';
import { TaskListLoading } from '@/client/components/tasks/TaskList';

export default function Loading() {
  return (
    <PageContent>
      <TaskListLoading />
    </PageContent>
  );
}
