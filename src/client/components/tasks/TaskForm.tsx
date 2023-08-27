'use client';

import { Suspense, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { extractErrorMessages } from '@/client/gql/errorHandling';
import { TaskStatus, type Task, type TasksQuery } from '@/client/gql/generated/graphql';
import { addToCache, removeFromCache } from '@/client/gql/graphql-helpers';
import { CREATE_TASK, DELETE_TASK, TASK, TASKS, UPDATE_TASK } from '@/client/gql/queries-mutations';
import {
  Button,
  Card,
  CardBody,
  InputControlled,
  Radio,
  RadioGroupControlled,
  TextareaControlled,
} from '@/client/ui';
import { useMutation } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button as NextUIButton, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import 'react-day-picker/dist/style.css';

interface Props {
  id?: string;
}

export default function TaskForm(props: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false);

  const { data: dataQuery, error: errorQuery } = useSuspenseQuery(TASK, {
    variables: { id: props.id || '' },
    skip: props.id === undefined,
  });

  // Create and Update loading is handled by form submitting
  // mutation error will render errors but not handle them
  // https://stackoverflow.com/questions/59465864/handling-errors-with-react-apollo-usemutation-hook
  const [createTask, { error: createMutationError }] = useMutation(CREATE_TASK);
  const [updateTask, { error: updateMutationError }] = useMutation(UPDATE_TASK);
  const [deleteTask, { error: deleteMutationError, loading: loadingDelete }] =
    useMutation(DELETE_TASK);

  // TODO: dueDate should be Date (form not submitting)
  type FormData = {
    title: string;
    description?: string;
    status: string;
    dueDate?: string;
  };

  // TODO: dueDate should be date()  (form not submitting)
  const schema = z.object({
    title: z.string().min(1, 'Title is a required field'),
    description: z.string(),
    status: z.string().min(1, 'Status is a required field'),
    dueDate: z.string(),
  });

  const { id, title, description, dueDate, status, version } =
    (dataQuery?.task as Task) || ({} as Task);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: title || '',
      description: description || '',
      dueDate: dueDate?.toString() || undefined,
      status: status || TaskStatus.Active,
    },
  });

  const onSubmit = async ({ title, description, status, dueDate }: FormData) => {
    const input = {
      title: title,
      description: description,
      dueDate: !dueDate || dueDate == '' ? null : new Date(dueDate),
      status: status == 'ACTIVE' ? TaskStatus.Active : TaskStatus.Completed,
    };

    if (dataQuery?.task) {
      const result = await updateTask({
        variables: {
          id,
          input: {
            ...input,
            version,
          },
        },
      });
      if (result.data) {
        router.push('/app');
      }
    } else {
      const result = await createTask({
        variables: { input },
        // optimisticResponse: optimisticResponseHelper<CreateTaskMutation>('createTask', input),
        update(cache, { data }) {
          void addToCache<TasksQuery>(data?.createTask, TASKS, cache, 'tasks');
        },
      });
      if (result.data) {
        router.push('/app');
      }
    }
  };

  const handleDelete = async () => {
    const result = await deleteTask({
      variables: { id },
      // TODO when optimistic errors are handled
      // optimisticResponse: optimisticResponseHelper<DeleteTaskMutation>('deleteTask', props.task),
      update(cache, { data }) {
        void removeFromCache<TasksQuery>(data?.deleteTask, TASKS, cache, 'tasks');
      },
    });
    if (result.data) {
      router.push('/app');
    }
  };

  // Without this, updating description causes form update schema checking to say "title can't be blank"
  if (errorQuery) return <div>{`Error! ${errorQuery.message}`}</div>;

  const formError = (errors: string[]) => {
    return (
      <div className="pb-5">
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
              <ul>
                {errors.map((errorMessage, index) => (
                  <li key={index}>{errorMessage}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Suspense>
      <Card radius="sm" shadow="sm" className="max-w-sm sm:max-w-md md:max-w-lg">
        <CardBody>
          <div>
            {createMutationError && formError(extractErrorMessages(createMutationError))}
            {updateMutationError && formError(extractErrorMessages(updateMutationError))}
            {deleteMutationError && formError(extractErrorMessages(deleteMutationError))}

            <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
              <InputControlled
                name="title"
                control={control}
                label="Title"
                errors={errors}
                className={'mb-5 mt-5'}
              />

              <TextareaControlled
                name="description"
                control={control}
                label="Description"
                minRows={2}
                errors={errors}
                className={'mb-5'}
              />

              <Controller
                name={'dueDate'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Popover
                      isOpen={isOpen}
                      onOpenChange={(open) => setIsOpen(open)}
                      placement="bottom"
                      showArrow={true}
                      onClose={() => setIsOpen(false)}
                    >
                      <PopoverTrigger>
                        <NextUIButton color="default" className={'mb-5 mr-3'}>
                          Due Date:&nbsp;
                          {value ? `${format(new Date(value), 'PP')}` : 'none'}
                        </NextUIButton>
                      </PopoverTrigger>
                      <PopoverContent>
                        <DayPicker
                          mode="single"
                          selected={value ? new Date(value) : undefined}
                          onSelect={(date, selectedDay, activeModifiers, e) => {
                            onChange(date);
                            (e.currentTarget as HTMLElement).blur(); // Close popover
                          }}
                        />
                      </PopoverContent>
                    </Popover>

                    {value && (
                      <NextUIButton
                        variant="ghost"
                        color="danger"
                        className={'mb-5'}
                        onPress={() => onChange('')}
                      >
                        Clear
                      </NextUIButton>
                    )}
                  </>
                )}
              />

              <RadioGroupControlled
                isDisabled={false}
                onChange={undefined}
                color={'primary'}
                size={'md'}
                disableAnimation={false}
                control={control}
                name="status"
                label="Status"
                orientation="horizontal"
                errors={errors}
              >
                <Radio value={TaskStatus.Active}>Active</Radio>
                <Radio value={TaskStatus.Completed}>Completed</Radio>
              </RadioGroupControlled>

              <div className={'mt-10 flex justify-between'}>
                <div className={'flex justify-center'}>
                  <Button
                    color={'primary'}
                    type="submit"
                    isLoading={isSubmitting}
                    className={'mr-5'}
                  >
                    {id ? 'Save' : 'Create'}
                  </Button>

                  <Button as={NextLink} href={'/app'} color={'default'} isDisabled={isSubmitting}>
                    Cancel
                  </Button>
                </div>

                {dataQuery?.task && (
                  <Button
                    type="button"
                    color="danger"
                    className="rounded bg-red-600 p-5 py-2 font-bold text-white shadow-lg transition duration-200 hover:bg-red-700 hover:shadow-xl"
                    onPress={() => void handleDelete()}
                    isLoading={loadingDelete}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </form>
          </div>
        </CardBody>
      </Card>
    </Suspense>
  );
}
