/* clone-code ENTITY_HOOK
{
  "toFile": "src/app/client/admin/<%= h.changeCase.camelCase(name)) %>/<%= h.changeCase.pascalCase(name) %>Table.tsx",
  "replacements": [
    { "find": "Task", "replace": "<%= h.changeCase.pascalCase(name) %>" },
    { "find": "task", "replace": "<%= h.changeCase.camelCase(name) %>" },
    { "find": "TASK", "replace": "<%= h.changeCase.constantCase(name) %>" }
  ]
}
*/
'use client';

import { type FormFieldConfig } from '@/client/admin/edit/formGeneration';
import AdminTable from '@/client/admin/table/AdminTable';
import { ADMIN_TASKS_PAGE } from '@/client/gql/admin-queries.gql';
import {
  type AdminTasksPageQuery,
  type AdminTasksPageQueryVariables,
  type Task,
  type TaskWhere,
} from '@/client/gql/generated/graphql';

import { columnProps } from './RenderRows';

interface Props {
  loading?: boolean;
}

export const TaskTable = (props: Props) => {
  const inputConfig: FormFieldConfig[] = [
    {
      key: 'id',
    },
    {
      key: 'title',
    },
    {
      key: 'userId',
    },
  ];

  return (
    <AdminTable<Task, TaskWhere, AdminTasksPageQuery, AdminTasksPageQueryVariables>
      inputConfig={inputConfig}
      query={ADMIN_TASKS_PAGE}
      columnProps={columnProps}
      loading={props.loading}
      basePath={'/admin/task'}
      pageName={'tasksPage'}
      entityKey={'tasks'}
    />
  );
};
