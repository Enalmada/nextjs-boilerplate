/* eslint-disable no-console,@typescript-eslint/no-unsafe-assignment */
import React, { type ReactNode } from 'react';
import { UserRole, type User } from '@/client/gql/generated/graphql';
import { type Column, type RenderRowProps } from '@enalmada/nextui-admin';
import { Chip, Tooltip, User as UserChip } from '@nextui-org/react';
import { BiEditAlt as EditIcon } from 'react-icons/bi';

interface UserRenderRowProps extends RenderRowProps {
  item: User;
}

export const columns: Column[] = [
  { key: 'avatar', label: 'AVATAR' },
  { key: 'role', label: 'ROLE' },
  { key: 'auditing', label: 'AUDITING' },
  { key: 'actions', label: 'ACTIONS', align: 'end' },
];

export const renderRow = ({ item: user, columnKey }: UserRenderRowProps): ReactNode => {
  switch (columnKey) {
    case 'avatar':
      return (
        <UserChip
          avatarProps={{
            src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
          }}
          name={user.email}
          description={user.id}
        ></UserChip>
      );

    case 'role':
      return (
        <Chip size="sm" variant="flat" color={user.role === UserRole.Admin ? 'success' : 'primary'}>
          <span className="text-xs capitalize">{user.role}</span>
        </Chip>
      );

    case 'auditing':
      return (
        <>
          <div>Created {new Date(user.createdAt).toLocaleString()}</div>
          <div>Updated {new Date(user.updatedAt).toLocaleString()}</div>
          <div>Version {user.version}</div>
        </>
      );

    case 'actions':
      return (
        <div className="flex items-end gap-4 ">
          <div>
            <Tooltip content="Edit" color="secondary">
              <button onClick={() => console.log('Edit', user.id)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
        </div>
      );
    default:
      return <></>;
  }
};
