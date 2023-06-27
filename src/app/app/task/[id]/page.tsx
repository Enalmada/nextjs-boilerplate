"use client";

import { redirect } from "next/navigation";
import BreadCrumb from "@/client/components/Breadcrumb";
import PageLayout from "@/client/components/layout/PageLayout";
import TaskForm from "@/client/components/tasks/TaskForm";
import { type TasksQuery } from "@/client/gql/graphql";
import { TASKS } from "@/client/queries-mutations";
import { getRouteById } from "@/client/utils/routes";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";

interface Props {
  params: {
    id: string;
  };
}

export default function Page(props: Props) {
  const id = props.params.id;

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });

  // TODO: don't skip if we can ensure session at this point
  // TODO: change back to useSuspenseQuery if skip can be removed
  const { data, error } = useQuery<TasksQuery>(TASKS, {
    skip: session === undefined,
  });
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
