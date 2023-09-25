'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { type User, type UsersQuery } from '@/client/gql/generated/graphql';
import { USERS } from '@/client/gql/queries-mutations';
import { Breadcrumb } from '@/client/ui';
import { getRouteById } from '@/client/utils/routes';
import { useSuspenseQuery } from '@apollo/client';
import { useTableWrapper } from '@enalmada/nextui-admin';
import { Input } from '@nextui-org/react';

import { columns, renderRow } from './RenderRow';

export const UserList = () => {
  const router = useRouter();

  const { TableWrapperComponent } = useTableWrapper<User>();

  const { data: dataQuery, error: errorQuery } = useSuspenseQuery<UsersQuery>(USERS);
  if (errorQuery) return <div>{`Error! ${errorQuery.message}`}</div>;

  return (
    <>
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
          linkFunction={(id: React.Key) => router.push(`/admin/tasks/${id}`)}
        />
      </div>
    </>
  );
};
