import BreadCrumb from "@/client/components/Breadcrumb";
import PageLayout from "@/client/components/layout/PageLayout";
import TaskForm from "@/client/components/tasks/TaskForm";
import { getRouteById } from "@/client/utils/routes";

export const metadata = {
  title: "New Task",
};

export default function Page() {
  return (
    <PageLayout>
      <BreadCrumb routes={[getRouteById("Home"), getRouteById("NewTask")]} />
      <TaskForm />
    </PageLayout>
  );
}
