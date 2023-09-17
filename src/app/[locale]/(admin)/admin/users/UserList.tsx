'use client';

import React, { useState } from 'react';
import { TableWrapper, type PageDescriptor } from '@/client/admin/table/TableWrapper';
import { type User, type UserRole, type UsersQuery } from '@/client/gql/generated/graphql';
import { USERS } from '@/client/gql/queries-mutations';
import { Breadcrumb } from '@/client/ui';
import { getRouteById } from '@/client/utils/routes';
import { useSuspenseQuery } from '@apollo/client';
import { Input } from '@nextui-org/react';

import { columns, renderRow } from './RenderRow';

export interface UserRow {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export const UserList = () => {
  const [pageDescriptor, setPageDescriptor] = useState<PageDescriptor>({
    page: 1,
    pageSize: 50,
  });

  const { data: dataQuery, error: errorQuery } = useSuspenseQuery<UsersQuery>(USERS);
  if (errorQuery) return <div>{`Error! ${errorQuery.message}`}</div>;

  return (
    <div className="mx-auto my-14 flex w-full max-w-[95rem] flex-col gap-4">
      <Breadcrumb routes={[getRouteById('AdminHome'), getRouteById('Users')]} />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
          <Input
            classNames={{
              input: 'w-full',
              mainWrapper: 'w-full',
            }}
            placeholder="Search users"
          />
        </div>
      </div>
      <div className="mx-auto w-full max-w-[95rem]">
        <TableWrapper<User>
          columns={columns}
          items={dataQuery?.users || undefined}
          renderRow={renderRow}
          emptyContent={'No rows to display.'}
          pagingDescriptor={{
            pageDescriptor: pageDescriptor,
            setPageDescriptor: setPageDescriptor,
            hasMore: true,
          }}
        />
      </div>
    </div>
  );
};
