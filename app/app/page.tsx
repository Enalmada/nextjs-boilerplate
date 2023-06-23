"use client";

import React from "react";
import { type NextPage } from "next";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import Page from "@/components/layout/Page";
import TaskList from "@/components/tasks/TaskList";
import { getRouteById } from "@/utils/routes";

const About: NextPage = () => {
  return (
    <Layout title={"App"}>
      <Page>
        <div>
          <div className="my-2 w-full text-center text-2xl font-bold leading-tight text-gray-800">
            Task Manager
          </div>
          <div className="mb-4 w-full">
            <div className="gradient mx-auto my-0 h-1 w-64 rounded-t py-0 opacity-25"></div>
          </div>
        </div>

        <div className={"mb-6 text-center"}>
          <Link href={getRouteById("NewTask").path}>
            <button className="rounded bg-purple-600 px-20 py-2 text-center font-bold text-white shadow-lg transition duration-200 hover:bg-purple-700 hover:shadow-xl">
              New Task
            </button>
          </Link>
        </div>

        <TaskList />
      </Page>
    </Layout>
  );
};

export default About;
