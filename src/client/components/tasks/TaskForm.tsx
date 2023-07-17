'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  TaskStatus,
  type CreateTaskMutation,
  type DeleteTaskMutation,
  type Task,
  type TaskQuery,
  type TasksQuery,
} from '@/client/gql/graphql';
import { CREATE_TASK, DELETE_TASK, TASK, TASKS, UPDATE_TASK } from '@/client/queries-mutations';
import {
  addToCache,
  optimisticResponseHelper,
  removeFromCache,
} from '@/client/utils/graphql-helpers';
import { getRouteById } from '@/client/utils/routes';
import { useMutation, useSuspenseQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import DatePicker from '../DatePicker';

interface Props {
  id?: string;
}

export default function TaskForm(props: Props) {
  const router = useRouter();

  const { data, error } = useSuspenseQuery<TaskQuery>(TASK, {
    variables: { id: props.id },
    skip: props.id === undefined,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [createTask, { error: createMutationError }] = useMutation(CREATE_TASK);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [updateTask, { error: updateMutationError }] = useMutation(UPDATE_TASK);

  // TODO: dueDate should be Date (form not submitting)
  type FormData = {
    title: string;
    description?: string;
    status: string;
    dueDate?: string;
  };

  // TODO: dueDate should be date()  (form not submitting)
  const schema = yup.object().shape({
    title: yup.string().required('Title is a required field'),
    description: yup.string(),
    status: yup.string().required('Status is a required field'),
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

  const onSubmit = async ({ title, description, status, dueDate }: FormData) => {
    const input = {
      id: props.id,
      title: title,
      description: description,
      dueDate: !dueDate || dueDate == '' ? null : new Date(dueDate),
      status: status == 'ACTIVE' ? TaskStatus.Active : TaskStatus.Completed,
    };

    try {
      if (input.id) {
        await updateTask({ variables: { input } });
      } else {
        await createTask({
          variables: { input },
          optimisticResponse: optimisticResponseHelper<CreateTaskMutation>('createTask', input),
          update(cache, { data }) {
            void addToCache<TasksQuery>(data?.createTask, TASKS, cache, 'tasks');
          },
        });
      }
      router.push(getRouteById('Home').path);
    } catch (e) {
      // mutation error will render errors but not handle them
      // https://stackoverflow.com/questions/59465864/handling-errors-with-react-apollo-usemutation-hook
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
  // const mutationErrorMessage = mutationError?.networkError?.graphQLErrors?.[0]?.message;
  /*
  const mutationErrorMessage = (mutationError): string => {
    const graphQLErrors = mutationError?.graphQLErrors;
    if (!graphQLErrors) {
      return 'No error message available';
    }
    const errorMessage = graphQLErrors[0]?.message;
    return errorMessage ?? 'No error message available';
  };
   */
  //const mutationErrorMessage = (mutationError: CombinedError) => {
  //  return mutationError.message;
  //};

  // Without this, updating description causes form update schema checking to say "title can't be blank"

  if (error) return <div>{`Error! ${error.message}`}</div>;

  const { id, title, description, dueDate, status } = (data?.task as Task) || ({} as Task);

  return (
    <Suspense>
      <div className="max-w-sm sm:max-w-md md:max-w-lg">
        {/*
        {upsertTaskResult.error && (
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
              <div className="alert-title text-lg font-semibold text-red-800">Error</div>
              <div className="alert-description text-sm text-red-600">
                {mutationErrorMessage(upsertTaskResult.error)}
              </div>
            </div>
          </div>
        )}
        */}

        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={'mb-5'}>
            <label className="block">
              <span className="text-gray-700">Title</span>
              <input
                className="form-input mt-1 block w-full"
                {...register('title')}
                defaultValue={title}
              />
            </label>
            {errors.title?.message && (
              <span className={'text-red-600'}>{errors.title?.message}</span>
            )}
          </div>

          <div className={'mb-5'}>
            <label className="block">
              <span className="text-gray-700">Description</span>
              <textarea
                className="form-textarea mt-1 block w-full"
                defaultValue={description ?? undefined}
                rows={3}
                {...register('description')}
              ></textarea>
            </label>
            {errors.description?.message && (
              <span className={'text-red-600'}>{errors.description?.message}</span>
            )}
          </div>

          <div className="mb-5">
            <label className="block" htmlFor={'dueDate'}>
              <span className="text-gray-700">Due Date</span>

              <div>
                <Controller
                  control={control}
                  name="dueDate"
                  defaultValue={dueDate ? dueDate.toString() : undefined}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <DatePicker
                      id={'dueDate'}
                      name={'dueDate'}
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
              <span className={'text-red-600'}>{errors.title?.message}</span>
            )}
          </div>

          <div className="mb-5">
            <span className="text-gray-700">Status</span>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  {...register('status')}
                  value="ACTIVE"
                  defaultChecked={!status || status === TaskStatus.Active}
                />
                <span className="ml-2">Active</span>
              </label>
              <label className="ml-6 inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  {...register('status')}
                  value="COMPLETED"
                  defaultChecked={status === TaskStatus.Completed}
                />
                <span className="ml-2">Completed</span>
              </label>
            </div>
            {errors.status?.message && (
              <span className={'text-red-600'}>{errors.status?.message}</span>
            )}
          </div>

          <div className={'mt-10 flex justify-between'}>
            <div>
              <button
                type="submit"
                className="mr-3 rounded bg-purple-600 p-5 py-2 font-bold text-white shadow-lg transition duration-200 hover:bg-purple-700 hover:shadow-xl"
              >
                {id ? 'Save' : 'Create'}
              </button>

              <Link href={getRouteById('Home').path}>
                <button className="rounded bg-white p-5 py-2 font-bold text-gray-700 shadow-lg transition duration-200 hover:bg-gray-200 hover:shadow-xl">
                  Cancel
                </button>
              </Link>
            </div>

            {data?.task && <DeleteTaskButton task={data.task} />}
          </div>
        </form>
      </div>
    </Suspense>
  );
}

interface DeleteTaskButtonProps {
  task: Task;
}

function DeleteTaskButton(props: DeleteTaskButtonProps) {
  const router = useRouter();

  const [deleteTask] = useMutation(DELETE_TASK);

  const handleDelete = () => {
    try {
      void deleteTask({
        variables: { id: props.task.id },
        optimisticResponse: optimisticResponseHelper<DeleteTaskMutation>('deleteTask', props.task),
        update(cache, { data }) {
          void removeFromCache<TasksQuery>(data?.deleteTask, TASKS, cache, 'tasks');
        },
      });
      router.push(getRouteById('Home').path);
    } catch (error) {
      // Handle the error appropriately, e.g., display error message or redirect to error page
      console.error('Error deleting task:', error);
      // TODO: Display error message or redirect to error page
    }
  };

  return (
    <button
      type="button"
      className="rounded bg-red-600 p-5 py-2 font-bold text-white shadow-lg transition duration-200 hover:bg-red-700 hover:shadow-xl"
      onClick={() => void handleDelete()}
    >
      Delete
    </button>
  );
}
