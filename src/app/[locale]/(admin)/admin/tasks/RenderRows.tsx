/* eslint-disable no-console,@typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { TaskStatus, type Task } from '@/client/gql/generated/graphql';
import { type TableColumnProps } from '@enalmada/nextui-admin';
import { Chip, Tooltip } from '@nextui-org/react';
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
        size="sm"
        variant="flat"
        color={task.status === TaskStatus.Completed ? 'success' : 'primary'}
      >
        <span className="text-xs capitalize">{task.status}</span>
      </Chip>
    ),
  },
  { key: 'dueDate', header: 'Due Date', allowsSorting: true },
  {
    key: 'auditing',
    header: 'AUDITING',
    renderCell: (task: Task) => (
      <>
        {task.createdAt && <div>Created {new Date(task.createdAt).toLocaleString()}</div>}
        {task.updatedAt && <div>Updated {new Date(task.updatedAt).toLocaleString()}</div>}
        <div>Version {task.version}</div>
      </>
    ),
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
