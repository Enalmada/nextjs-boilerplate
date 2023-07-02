"use client";

import Link from "next/link";
import { TASKS } from "@/client/queries-mutations";
import { useQuery } from "@apollo/client";

import Task from "./Task";

export default function TaskList() {
  const { data, error } = useQuery(TASKS);

  if (!data) return null;
  if (error) return <div>{`Error! ${error.message}`}</div>;

  const tasks = [...data.tasks].sort((a, b) => {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return (
    <div>
      {tasks.map((task) => {
        return (
          <Link href={`/app/task/${task.id}`} key={task.id}>
            <Task task={task} />
          </Link>
        );
      })}
    </div>
  );
}
