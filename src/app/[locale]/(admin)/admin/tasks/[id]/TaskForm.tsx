/* clone-code ENTITY_HOOK
{
  "toFile": "src/app/[locale]/(admin)/admin/<%= h.inflection.pluralize(h.changeCase.camelCase(name)) %>/[id]/<%= h.changeCase.pascalCase(name) %>Form.tsx",
  "replacements": [
    { "find": "Task", "replace": "<%= h.changeCase.pascalCase(name) %>" },
    { "find": "task", "replace": "<%= h.changeCase.camelCase(name) %>" },
    { "find": "TASK", "replace": "<%= h.changeCase.constantCase(name) %>" }
  ]
}
*/
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ADMIN_DELETE_TASK, ADMIN_TASK, ADMIN_UPDATE_TASK } from '@/client/gql/admin-queries.gql';
import { extractErrorMessages } from '@/client/gql/errorHandling';
import {
  TaskStatus,
  type AdminDeleteTaskMutation,
  type AdminTaskQuery,
  type AdminUpdateTaskMutation,
  type AdminUpdateTaskMutationVariables,
  type MutationUpdateTaskInput,
} from '@/client/gql/generated/graphql';
import {
  Button,
  Card,
  CardBody,
  InputControlled,
  Radio,
  RadioGroupControlled,
  TextareaControlled,
} from '@/client/ui';
import { useMutation, useQuery } from '@enalmada/next-gql/client';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Button as NextUIButton, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { format } from 'date-fns/format';
import { DayPicker } from 'react-day-picker';
import { Controller, useForm } from 'react-hook-form';
import { date, enum_, minLength, nullable, object, optional, required, string } from 'valibot';

import 'react-day-picker/dist/style.css';

import CancelButton from '@/client/components/admin/buttons/CancelButton';
import DeleteButton from '@/client/components/admin/buttons/DeleteButton';
import ReadOnlyInput from '@/client/components/admin/ReadOnlyInput';

interface Props {
  id?: string;
}

export default function TaskForm(props: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false);

  const [{ data: queryData, error: queryError }] = useQuery<AdminTaskQuery>({
    query: ADMIN_TASK,
    variables: { id: props.id || '' },
    pause: props.id === undefined,
  });

  // Create and Update loading is handled by form submitting
  // mutation error will render errors but not handle them
  // https://stackoverflow.com/questions/59465864/handling-errors-with-react-apollo-usemutation-hook
  const [{ error: updateMutationError }, updateTask] = useMutation<
    AdminUpdateTaskMutation,
    AdminUpdateTaskMutationVariables
  >(ADMIN_UPDATE_TASK);
  const [{ error: deleteError, fetching: deleteFetching }, deleteTask] =
    useMutation<AdminDeleteTaskMutation>(ADMIN_DELETE_TASK);

  const schema = required(
    object({
      title: string([minLength(1, 'Title is a required field')]),
      description: optional(string()),
      status: enum_(TaskStatus),
      dueDate: nullable(date()),
    })
  );

  // '' necessary for SSR to maintain controlled component
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
  } = useForm<MutationUpdateTaskInput>({
    resolver: valibotResolver(schema),
    defaultValues: {
      ...queryData?.task,
    },
  });

  const onSubmit = async (formData: MutationUpdateTaskInput) => {
    const result = await updateTask({
      id: props.id!,
      input: {
        ...formData,
        version: queryData!.task!.version,
      },
    });

    if (result.data) {
      router.push('/admin/tasks');
    }
  };

  const handleDelete = async () => {
    const result = await deleteTask({
      id: props.id!,
      // TODO when optimistic errors are handled
      // optimisticResponse: optimisticResponseHelper<DeleteTaskMutation>('deleteTask', props.task),
      //update(cache, { data }) {
      //   void removeFromCache<MyTasksQuery>(data?.deleteTask, TASKS, cache, 'tasks');
      //},
    });
    if (result.data) {
      router.push('/admin/tasks');
    }
  };

  // Without this, updating description causes form update schema checking to say "title can't be blank"
  if (queryError) return <div>{`Error! ${queryError.message}`}</div>;

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
    <Card radius="sm" shadow="sm" className="max-w-sm sm:max-w-md md:max-w-lg">
      <CardBody>
        <div>
          {updateMutationError && formError(extractErrorMessages(updateMutationError))}
          {deleteError && formError(extractErrorMessages(deleteError))}

          <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
            <ReadOnlyInput label="ID" defaultValue={props.id} />

            <InputControlled
              name="title"
              control={control}
              label="Title"
              errors={errors}
              className={'mb-5'}
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
                        onSelect={(date, _selectedDay, _activeModifiers, e) => {
                          onChange(date || null);
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
                      onPress={() => onChange(null)}
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
              {Object.entries(TaskStatus).map(([key, value]) => (
                <Radio key={key} value={value}>
                  {value}
                </Radio>
              ))}
            </RadioGroupControlled>

            <div className={'mt-10 flex justify-between'}>
              <div className={'flex justify-center'}>
                <Button color={'primary'} type="submit" isLoading={isSubmitting} className={'mr-5'}>
                  {props.id ? 'Save' : 'Create'}
                </Button>

                <CancelButton href={'/admin/tasks'} isDisabled={isSubmitting} />
              </div>

              {queryData?.task && (
                <DeleteButton onPress={() => void handleDelete()} isLoading={deleteFetching} />
              )}
            </div>
          </form>
        </div>
      </CardBody>
    </Card>
  );
}
