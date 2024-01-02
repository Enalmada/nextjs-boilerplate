/* eslint-disable no-console,@typescript-eslint/no-unsafe-assignment */
import Auditing from '@/client/components/admin/Auditing';
import Chip from '@/client/components/admin/Chip';
import Edit from '@/client/components/admin/Edit';
import { UserRole, type User } from '@/client/gql/generated/graphql';
import { type TableColumnProps } from '@enalmada/nextui-admin';
import { User as UserChip } from '@nextui-org/react';
import gravatarUrl from 'gravatar-url';

export const columnProps: TableColumnProps<User>[] = [
  {
    key: 'avatar',
    header: 'AVATAR',
    renderCell: (user: User) => (
      <UserChip
        avatarProps={{
          src: gravatarUrl(user.email || '', { default: 'mp' }),
        }}
        name={user.name}
        description={user.email}
      ></UserChip>
    ),
  },
  {
    key: 'role',
    header: 'ROLE',
    renderCell: (user: User) => (
      <Chip color={user.role === UserRole.Admin ? 'danger' : 'default'} label={user.role} />
    ),
  },
  {
    key: 'auditing',
    header: 'AUDITING',
    renderCell: (user: User) => <Auditing entity={user} />,
  },
  {
    key: 'actions',
    header: 'ACTIONS',
    align: 'end',
    renderCell: () => <Edit />,
  },
];
