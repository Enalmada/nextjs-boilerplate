"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import PageLayout from "@/client/components/layout/PageLayout";
import TaskList from "@/client/components/tasks/TaskList";
import { getRouteById } from "@/client/utils/routes";
import { useSession } from "next-auth/react";

export const dynamic = "force-dynamic";

export default function Page() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });

  if (status === "loading") {
    return <p>Loading....</p>;
  }

  return (
    <PageLayout>
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
    </PageLayout>
  );
}
