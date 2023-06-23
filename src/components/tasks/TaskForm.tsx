"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { TaskStatus, type Task } from "@/gql/graphql";
import { DELETE_TASK, TASKS, UPSERT_TASK } from "@/queries-mutations";
import { getRouteById } from "@/utils/routes";
import { useMutation, type ApolloError } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import DatePicker from "../DatePicker";

interface Props {
  task?: Pick<Task, "id" | "title" | "description" | "dueDate" | "status">;
}

const TaskForm = (props: Props) => {
  const router = useRouter();

  const [upsertTask, { error: mutationError }] = useMutation(UPSERT_TASK, {
    refetchQueries: [{ query: TASKS }],
  });

  // TODO: dueDate should be Date (form not submitting)
  type FormData = {
    title: string;
    description?: string;
    status: string;
    dueDate?: string;
  };

  // TODO: dueDate should be date()  (form not submitting)
  const schema = yup.object().shape({
    title: yup.string().required("Title is a required field"),
    description: yup.string(),
    status: yup.string().required("Status is a required field"),
    dueDate: yup.string(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({
    title,
    description,
    status,
    dueDate,
  }: FormData) => {
    const input = {
      id: props.task?.id,
      title: title,
      description: description,
      dueDate: !dueDate || dueDate == "" ? null : new Date(dueDate),
      status: status == "ACTIVE" ? TaskStatus.Active : TaskStatus.Completed,
    };

    try {
      await upsertTask({
        variables: { input },
      });
      router.push(getRouteById("Home").path);
    } catch (e) {
      // mutation error will render errors but not handle them
      // https://stackoverflow.com/questions/59465864/handling-errors-with-react-apollo-usemutation-hook
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
  // const mutationErrorMessage = mutationError?.networkError?.graphQLErrors?.[0]?.message;
  const mutationErrorMessage = (
    mutationError: ApolloError | undefined
  ): string => {
    const graphQLErrors = mutationError?.graphQLErrors;
    if (!graphQLErrors) {
      return "No error message available";
    }
    const errorMessage = graphQLErrors[0]?.message;
    return errorMessage ?? "No error message available";
  };
  const { id, title, description, dueDate, status } = props.task || {};

  return (
    <div className="max-w-sm sm:max-w-md md:max-w-lg">
      {mutationError && (
        <div className="alert mb-5 flex flex-row items-center rounded border-b-2 border-red-300 bg-red-200 p-5">
          <div className="alert-icon flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-red-500 bg-red-100">
            <span className="text-red-500">
              <svg fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </div>
          <div className="alert-content ml-4">
            <div className="alert-title text-lg font-semibold text-red-800">
              Error
            </div>
            <div className="alert-description text-sm text-red-600">
              {mutationErrorMessage(mutationError)}
            </div>
          </div>
        </div>
      )}

      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"mb-5"}>
          <label className="block">
            <span className="text-gray-700">Title</span>
            <input
              className="form-input mt-1 block w-full"
              {...register("title")}
              defaultValue={title}
            />
          </label>
          {errors.title?.message && (
            <span className={"text-red-600"}>{errors.title?.message}</span>
          )}
        </div>

        <div className={"mb-5"}>
          <label className="block">
            <span className="text-gray-700">Description</span>
            <textarea
              className="form-textarea mt-1 block w-full"
              defaultValue={description ?? undefined}
              rows={3}
              {...register("description")}
            ></textarea>
          </label>
          {errors.description?.message && (
            <span className={"text-red-600"}>
              {errors.description?.message}
            </span>
          )}
        </div>

        <div className="mb-5">
          <label className="block" htmlFor={"dueDate"}>
            <span className="text-gray-700">Due Date</span>

            <div>
              <Controller
                control={control}
                name="dueDate"
                defaultValue={dueDate ? dueDate.toString() : undefined}
                render={({ field: { onChange, onBlur, value } }) => (
                  <DatePicker
                    id={"dueDate"}
                    name={"dueDate"}
                    onChange={(value) => {
                      /* TODO form won't submit null for unknown reason */
                      if (!value) {
                        onChange(undefined);
                      } else {
                        onChange(value.toString());
                      }
                    }}
                    onBlur={onBlur}
                    selected={value ? new Date(value) : null}
                  />
                )}
              />
            </div>
          </label>

          {errors.dueDate?.message && (
            <span className={"text-red-600"}>{errors.title?.message}</span>
          )}
        </div>

        <div className="mb-5">
          <span className="text-gray-700">Status</span>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                {...register("status")}
                value="ACTIVE"
                defaultChecked={!status || status === "ACTIVE"}
              />
              <span className="ml-2">Active</span>
            </label>
            <label className="ml-6 inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                {...register("status")}
                value="COMPLETED"
                defaultChecked={status === "COMPLETED"}
              />
              <span className="ml-2">Completed</span>
            </label>
          </div>
          {errors.status?.message && (
            <span className={"text-red-600"}>{errors.status?.message}</span>
          )}
        </div>

        <div className={"mt-10 flex justify-between"}>
          <div>
            <button
              type="submit"
              className="mr-3 rounded bg-purple-600 p-5 py-2 font-bold text-white shadow-lg transition duration-200 hover:bg-purple-700 hover:shadow-xl"
            >
              {id ? "Save" : "Create"}
            </button>

            <Link href={getRouteById("Home").path}>
              <button className="rounded bg-white p-5 py-2 font-bold text-gray-700 shadow-lg transition duration-200 hover:bg-gray-200 hover:shadow-xl">
                Cancel
              </button>
            </Link>
          </div>

          {id && <DeleteTaskButton id={id} />}
        </div>
      </form>
    </div>
  );
};

const DeleteTaskButton = (props: { id: string }) => {
  const router = useRouter();

  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: TASKS }],
  });

  return (
    <>
      <button
        type="button"
        className="rounded bg-red-600 p-5 py-2 font-bold text-white shadow-lg transition duration-200 hover:bg-red-700 hover:shadow-xl"
        onClick={() => {
          try {
            // Wait for deleteTask to complete before router.push
            // https://github.com/typescript-eslint/typescript-eslint/issues/4619#issuecomment-1055614155
            void (async () => {
              await deleteTask({ variables: { id: props.id } });
              router.push(getRouteById("Home").path);
            })();
          } catch (e) {
            // mutation error will render errors but not handle them
            // https://stackoverflow.com/questions/59465864/handling-errors-with-react-apollo-usemutation-hook
            // TODO: send error to error page
          }
        }}
      >
        Delete
      </button>
    </>
  );
};

export default TaskForm;
