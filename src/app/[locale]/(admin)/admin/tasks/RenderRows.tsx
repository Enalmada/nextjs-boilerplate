/* ENTITY_HOOK
{
  "toFile": "src/app/[locale]/(admin)/admin/<%= h.inflection.pluralize(h.changeCase.camelCase(name)) %>/RenderRows.tsx",
  "replacements": [
    { "find": "Task", "replace": "<%= h.changeCase.pascalCase(name) %>" },
    { "find": "task", "replace": "<%= h.changeCase.camelCase(name) %>" },
    { "find": "TASK", "replace": "<%= h.changeCase.constantCase(name) %>" }
  ]
}
*/
/* eslint-disable no-console,@typescript-eslint/no-unsafe-assignment */
import Auditing from '@/client/components/admin/Auditing';
import Chip from '@/client/components/admin/Chip';
import Edit from '@/client/components/admin/Edit';
import { TaskStatus, type Task } from '@/client/gql/generated/graphql';
import { type TableColumnProps } from '@enalmada/nextui-admin';

export const columnProps: TableColumnProps<Task>[] = [
  { key: 'title', header: 'Title', allowsSorting: true },
  { key: 'description', header: 'Description' },
  {
    key: 'status',
    header: 'Status',
    allowsSorting: true,
    renderCell: (task: Task) => (
      <Chip
        color={task.status === TaskStatus.Completed ? 'success' : 'primary'}
        label={task.status}
      />
    ),
  },
  { key: 'dueDate', header: 'Due Date', allowsSorting: true },
  {
    key: 'auditing',
    header: 'AUDITING',
    renderCell: (task: Task) => <Auditing entity={task} />,
  },
  {
    key: 'actions',
    header: 'ACTIONS',
    align: 'end',
    renderCell: () => <Edit />,
  },
];
