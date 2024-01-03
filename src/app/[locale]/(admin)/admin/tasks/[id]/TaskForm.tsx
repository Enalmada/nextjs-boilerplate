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
import ReadOnlyInput from '@/client/components/admin/ReadOnlyInput';

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
      key: 'title',
      label: 'Title',
      component: 'input',
      validation: string([minLength(1, 'Title is a required field')]),
    },
    {
      key: 'description',
      label: 'Description',
      component: 'textarea',
      validation: nullish(string()),
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      component: 'date',
      validation: nullishDateStringValidator,
    },
    {
      key: 'status',
      label: 'Status',
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
    reUrl: '/admin/tasks',
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
      reUrl={'/admin/tasks'}
      handleDelete={handleDelete}
      deleteFetching={deleteFetching}
    >
      <ReadOnlyInput label="ID" defaultValue={props.id} />

      <FormFields control={control} errors={errors} config={inputConfig} />
    </EditCard>
  );
}
