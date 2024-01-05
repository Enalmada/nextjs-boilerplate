/* eslint-disable no-console,@typescript-eslint/no-unsafe-assignment */
import { getAuditProps } from '@/client/admin/table/FormHelpers';
import Chip from '@/client/components/admin/Chip';
import { UserRole, type User } from '@/client/gql/generated/graphql';
import { type TableColumnProps } from '@enalmada/nextui-admin';
import { User as UserChip } from '@nextui-org/react';
import gravatarUrl from 'gravatar-url';

export const columnProps: TableColumnProps<User>[] = [
  {
    key: 'avatar',
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
    renderCell: (user: User) => (
      <Chip color={user.role === UserRole.Admin ? 'danger' : 'default'} label={user.role} />
    ),
  },
  ...getAuditProps<User>(),
];
