'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { type User, type UsersQuery } from '@/client/gql/generated/graphql';
import { USERS } from '@/client/gql/queries-mutations';
import { Breadcrumb } from '@/client/ui';
import { getRouteById } from '@/client/utils/routes';
import { useSuspenseQuery } from '@apollo/client';
import { Input } from '@nextui-org/react';
import { useTableWrapper } from 'nextui-admin';

import { columns, renderRow } from './RenderRow';

export const UserList = () => {
  const router = useRouter();

  const { TableWrapperComponent } = useTableWrapper<User>();

  const linkFunction = (id: React.Key) => router.push(`/admin/tasks/${id}`);

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
        <TableWrapperComponent
          columns={columns}
          items={dataQuery?.users || undefined}
          renderRow={renderRow}
          emptyContent={'No rows to display.'}
          hasMore={true}
          linkFunction={linkFunction}
        />
      </div>
    </div>
  );
};
