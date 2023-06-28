"use client";

import BreadCrumb from "@/client/components/Breadcrumb";
import PageLayout from "@/client/components/layout/PageLayout";
import TaskForm from "@/client/components/tasks/TaskForm";
import { type TasksQuery } from "@/client/gql/graphql";
import { TASKS } from "@/client/queries-mutations";
import { getRouteById } from "@/client/utils/routes";
import { useSuspenseQuery } from "@apollo/client";

interface Props {
  params: {
    id: string;
  };
}

export default function Page(props: Props) {
  const id = props.params.id;

  const { data, error } = useSuspenseQuery<TasksQuery>(TASKS);
  const task = data?.tasks.find((task) => id === task.id);

  if (!data) return null;
  if (error) return <div>{`Error! ${error.message}`}</div>;

  return (
    <PageLayout>
      <BreadCrumb routes={[getRouteById("Home"), getRouteById("Task")]} />
      <TaskForm task={task} />
    </PageLayout>
  );
}
