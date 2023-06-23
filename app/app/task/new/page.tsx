"use client";

//import { useRouter } from "next/router";
import React from "react";
import { type NextPage } from "next";
import BreadCrumb from "@/components/Breadcrumb";
import Layout from "@/components/layout/Layout";
import Page from "@/components/layout/Page";
import TaskForm from "@/components/tasks/TaskForm";
import { getRouteById } from "@/utils/routes";

const NewTask: NextPage = () => {
  //const router = useRouter();

  return (
    <Layout>
      <Page>
        <BreadCrumb routes={[getRouteById("Home"), getRouteById("NewTask")]} />
        <TaskForm />
      </Page>
    </Layout>
  );
};

export default NewTask;
