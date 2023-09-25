/* eslint-disable no-console,@typescript-eslint/no-unsafe-assignment */
import React, { type ReactNode } from 'react';
import { TaskStatus, type Task } from '@/client/gql/generated/graphql';
import { type Column, type RenderRowProps } from '@enalmada/nextui-admin';
import { Chip, Tooltip } from '@nextui-org/react';
import { BiEditAlt as EditIcon } from 'react-icons/bi';

interface TaskRenderRowProps extends RenderRowProps {
  item: Task;
}

export const columns: Column[] = [
  { key: 'id', label: 'ID', allowsSorting: true },
  { key: 'title', label: 'Title', allowsSorting: true },
  { key: 'description', label: 'Description' },
  { key: 'status', label: 'Status', allowsSorting: true },
  { key: 'dueDate', label: 'Due Date', allowsSorting: true },
];

export const renderTable = ({ item: task, columnKey }: TaskRenderRowProps): ReactNode => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const cellValue = task[columnKey];

  switch (columnKey) {
    case 'status':
      return (
        <Chip
          size="sm"
          variant="flat"
          color={task.status === TaskStatus.Completed ? 'success' : 'primary'}
        >
          <span className="text-xs capitalize">{task.status}</span>
        </Chip>
      );

    case 'auditing':
      return (
        <>
          <div>Created {new Date(task.createdAt).toLocaleString()}</div>
          <div>Updated {new Date(task.updatedAt).toLocaleString()}</div>
          <div>Version {task.version}</div>
        </>
      );

    case 'actions':
      return (
        <div className="flex items-end gap-4 ">
          <div>
            <Tooltip content="Edit" color="secondary">
              <button onClick={() => console.log('Edit', task.id)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
        </div>
      );
    default:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return cellValue;
  }
};
