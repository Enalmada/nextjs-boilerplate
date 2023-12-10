'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminPageQuery } from '@/client/admin/useAdminPageQuery';
import {
  type User,
  type UsersPageQuery,
  type UsersPageQueryVariables,
} from '@/client/gql/generated/graphql';
import { USERS_PAGE } from '@/client/gql/queries-mutations';
import { Button, InputControlled } from '@/client/ui';
import { useTableWrapper } from '@enalmada/nextui-admin';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm } from 'react-hook-form';
import { object, string } from 'valibot';

import { columnProps } from './RenderRows';

export const UserTable = () => {
  const router = useRouter();

  const { TableWrapperComponent, sortDescriptor, pageDescriptor } = useTableWrapper<User>();

  type FormData = {
    id?: string;
    email?: string;
  };

  const [userWhere, setUserWhere] = useState<FormData>({
    id: undefined,
    email: undefined,
  });

  const schema = object({
    id: string(),
    email: string(),
  });

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
  } = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      id: '',
      email: '', // necessary for SSR to maintain controlled component
    },
  });

  const onSubmit = ({ id, email }: FormData) => {
    setUserWhere({
      id: id || undefined,
      email: email || undefined,
    });
  };

  const {
    data: dataQuery,
    loading,
    error: errorQuery,
  } = useAdminPageQuery<FormData, UsersPageQuery, UsersPageQueryVariables>(USERS_PAGE, {
    input: userWhere,
    sortDescriptor,
    pageDescriptor,
  });

  if (errorQuery) return <div>{`Error! ${errorQuery.message}`}</div>;

  //  import { Breadcrumb } from '@/client/ui';
  //  import { getRouteById } from '@/client/utils/routes';
  //       <Breadcrumb routes={[getRouteById('AdminHome'), getRouteById('Users')]} />

  return (
    <>
      {errors.root && (
        <div
          className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600"
          role="alert"
        >
          <span className="font-bold">Error</span> {errors.root.message}
        </div>
      )}

      <div className="gap-4">
        <form
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
          className="flex w-full flex-wrap items-start gap-4"
        >
          <div className="max-w-sm">
            <InputControlled
              name="id"
              control={control}
              placeholder={'ID'}
              errors={errors}
              labelPlacement={'inside'}
              label={''}
              isDisabled={isSubmitting}
              classNames={{
                label: "after:content-['']",
              }}
            />
          </div>

          <div className="max-w-sm">
            <InputControlled
              name="email"
              control={control}
              placeholder={'Email'}
              errors={errors}
              labelPlacement={'inside'}
              label={''}
              isDisabled={isSubmitting}
              classNames={{
                label: "after:content-['']",
              }}
            />
          </div>

          <Button
            data-testid="submit"
            type="submit"
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
          >
            Submit
          </Button>
        </form>
      </div>

      <div className="mx-auto w-full">
        <TableWrapperComponent
          tableProps={{
            linkFunction: (id: React.Key) => router.push(`/admin/users/${id}`),
          }}
          columnProps={columnProps}
          bodyProps={{
            items: dataQuery?.usersPage.users || undefined,
            emptyContent: 'No rows to display.',
            isLoading: loading && !dataQuery,
          }}
          paginationProps={{
            hasMore: dataQuery?.usersPage?.hasMore,
          }}
        />
      </div>
    </>
  );
};
