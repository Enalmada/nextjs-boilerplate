/* eslint-disable no-console,@typescript-eslint/no-unsafe-assignment */
import Auditing from '@/client/components/admin/Auditing';
import Chip from '@/client/components/admin/Chip';
import Edit from '@/client/components/admin/Edit';
import { UserRole, type User } from '@/client/gql/generated/graphql';
import { createGravatarUrl } from '@/client/utils/gravatar';
import { type TableColumnProps } from '@enalmada/nextui-admin';
import { User as UserChip } from '@nextui-org/react';

export const columnProps: TableColumnProps<User>[] = [
  {
    key: 'avatar',
    header: 'AVATAR',
    renderCell: async (user: User) => (
      <UserChip
        avatarProps={{
          src: await createGravatarUrl(user.email, { fallback: 'mp' }),
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
