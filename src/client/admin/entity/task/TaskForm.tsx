/* clone-code ENTITY_HOOK
{
  "toFile": "src/client/admin/entity/<%= h.inflection.pluralize(h.changeCase.camelCase(name)) %>/<%= h.changeCase.pascalCase(name) %>Form.tsx",
  "replacements": [
    { "find": "Task", "replace": "<%= h.changeCase.pascalCase(name) %>" },
    { "find": "task", "replace": "<%= h.changeCase.camelCase(name) %>" },
    { "find": "TASK", "replace": "<%= h.changeCase.constantCase(name) %>" }
  ]
}
*/
'use client';

import { ADMIN_DELETE_TASK, ADMIN_TASK, ADMIN_UPDATE_TASK } from '@/client/gql/admin-queries.gql';
import {
  TaskStatus,
  type AdminDeleteTaskMutation,
  type AdminDeleteTaskMutationVariables,
  type AdminTaskQuery,
  type AdminTaskQueryVariables,
  type AdminUpdateTaskMutation,
  type AdminUpdateTaskMutationVariables,
  type MutationUpdateTaskInput,
} from '@/client/gql/generated/graphql';
import { coerce, date, enum_, minLength, nullish, number, string } from 'valibot';

import 'react-day-picker/dist/style.css';

import EditCard from '@/client/admin/edit/EditCard';
import FormFields, {
  generateFormSchema,
  type FormFieldConfig,
} from '@/client/admin/edit/formGeneration';
import { useAdminEdit } from '@/client/admin/edit/useAdminEdit';

interface Props {
  id?: string;
}

const transformStringToDate = (value: unknown): unknown => {
  return value ? new Date(value as string | Date) : null;
};

const nullishDateStringValidator = coerce(nullish(date()), transformStringToDate);

export default function TaskForm(props: Props) {
  const inputConfig: FormFieldConfig[] = [
    {
      key: 'id',
      isDisabled: true,
      validation: null,
    },
    {
      key: 'title',
      component: 'input',
      validation: string([minLength(1, 'Title is a required field')]),
    },
    {
      key: 'description',
      component: 'textarea',
      validation: nullish(string()),
    },
    {
      key: 'dueDate',
      component: 'date',
      validation: nullishDateStringValidator,
    },
    {
      key: 'status',
      component: 'radio',
      validation: enum_(TaskStatus),
      enum: TaskStatus,
    },
    {
      key: 'version',
      component: 'hidden',
      validation: number(),
    },
  ];

  const {
    queryResult: { error: queryError },
    updateMutation: [{ error: updateError }],
    deleteMutation: [{ error: deleteError, fetching: deleteFetching }],
    form: {
      formState: { errors, isSubmitting },
      handleSubmit,
      control,
      onSubmit,
    },
    handleDelete,
  } = useAdminEdit<
    AdminTaskQuery,
    AdminTaskQueryVariables,
    AdminUpdateTaskMutation,
    AdminUpdateTaskMutationVariables,
    MutationUpdateTaskInput,
    AdminDeleteTaskMutation,
    AdminDeleteTaskMutationVariables
  >(props.id, 'task', ADMIN_TASK, ADMIN_UPDATE_TASK, ADMIN_DELETE_TASK, {
    formSchema: generateFormSchema(inputConfig),
    reUrl: '/admin/task',
  });

  // Without this, updating description causes form update schema checking to say "title can't be blank"
  if (queryError) return <div>{`Error! ${queryError.message}`}</div>;

  return (
    <EditCard
      save={!!props.id}
      errors={[updateError, deleteError]}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      reUrl={'/admin/task'}
      handleDelete={handleDelete}
      deleteFetching={deleteFetching}
    >
      <FormFields control={control} errors={errors} config={inputConfig} />
    </EditCard>
  );
}
