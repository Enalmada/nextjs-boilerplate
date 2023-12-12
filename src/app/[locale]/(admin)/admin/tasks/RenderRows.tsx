/* eslint-disable no-console,@typescript-eslint/no-unsafe-assignment */
import React from 'react';
import Auditing from '@/client/components/admin/Auditing';
import Chip from '@/client/components/admin/Chip';
import { TaskStatus, type Task } from '@/client/gql/generated/graphql';
import { type TableColumnProps } from '@enalmada/nextui-admin';
import { Tooltip } from '@nextui-org/react';
import { BiEditAlt as EditIcon } from 'react-icons/bi';

export const columnProps: TableColumnProps<Task>[] = [
  { key: 'id', header: 'ID', allowsSorting: true },
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
    renderCell: (task: Task) => (
      <div className="flex items-end gap-4 ">
        <div>
          <Tooltip content="Edit" color="secondary">
            <button onClick={() => console.log('Edit', task.id)}>
              <EditIcon size={20} fill="#979797" />
            </button>
          </Tooltip>
        </div>
      </div>
    ),
  },
];
