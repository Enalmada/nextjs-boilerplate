"use client";

import BreadCrumb from "@/components/Breadcrumb";
import Layout from "@/components/layout/Layout";
import Page from "@/components/layout/Page";
import TaskForm from "@/components/tasks/TaskForm";
import { type TasksQuery } from "@/gql/graphql";
import { TASKS } from "@/queries-mutations";
import { getRouteById } from "@/utils/routes";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

interface Params {
  id: string;
}

const TaskPage = (params: Params) => {
  const id = params.id;

  const { data, error } = useSuspenseQuery<TasksQuery>(TASKS);
  const task = data.tasks.find((task) => id == task.id);

  if (!data) return null;
  if (error) return <div>{`Error! ${error.message}`}</div>;
  return (
    <Layout>
      <Page>
        <BreadCrumb routes={[getRouteById("Home"), getRouteById("Task")]} />
        <TaskForm task={task} />
      </Page>
    </Layout>
  );
};

export default TaskPage;
