'use client';

import { type FormFieldConfig } from '@/client/admin/edit/formGeneration';
import AdminTable from '@/client/admin/table/AdminTable';
import { ADMIN_USERS_PAGE } from '@/client/gql/admin-queries.gql';
import {
  type AdminUsersPageQuery,
  type AdminUsersPageQueryVariables,
  type User,
  type UserWhere,
} from '@/client/gql/generated/graphql';

import { columnProps } from './RenderRows';

interface Props {
  loading?: boolean;
}

export const UserTable = (props: Props) => {
  const inputConfig: FormFieldConfig[] = [
    {
      key: 'id',
    },
    {
      key: 'email',
    },
  ];

  return (
    <AdminTable<User, UserWhere, AdminUsersPageQuery, AdminUsersPageQueryVariables>
      inputConfig={inputConfig}
      query={ADMIN_USERS_PAGE}
      columnProps={columnProps}
      loading={props.loading}
      basePath={'/admin/user'}
      pageName={'usersPage'}
      entityKey={'users'}
    />
  );
};
