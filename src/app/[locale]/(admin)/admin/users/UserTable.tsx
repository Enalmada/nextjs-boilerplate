'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminPageQuery } from '@/client/admin/useAdminPageQuery';
import { ADMIN_USERS_PAGE } from '@/client/gql/admin-queries.gql';
import {
  type AdminUsersPageQuery,
  type AdminUsersPageQueryVariables,
  type User,
  type UserWhere,
} from '@/client/gql/generated/graphql';
import { Button, InputControlled } from '@/client/ui';
import { useTableWrapper } from '@enalmada/nextui-admin';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm } from 'react-hook-form';
import { object, optional, string } from 'valibot';

import { columnProps } from './RenderRows';

interface Props {
  loading?: boolean;
}

export const UserTable = (props: Props) => {
  const router = useRouter();

  const { TableWrapperComponent, sortDescriptor, pageDescriptor } = useTableWrapper<User>();

  const [userWhere, setUserWhere] = useState<UserWhere>();

  const schema = object({
    id: optional(string()),
    email: optional(string()),
  });

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
  } = useForm<UserWhere>({
    resolver: valibotResolver(schema),
    defaultValues: {
      ...userWhere,
    },
  });

  const onSubmit = (formData: UserWhere) => {
    // Transform each string field: if it's an empty string, set it to undefined
    const transformedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value === '' ? undefined : value])
    );
    setUserWhere({
      ...transformedFormData,
    });
  };

  const {
    data: queryData,
    fetching: queryFetching,
    error: errorQuery,
  } = useAdminPageQuery<UserWhere, AdminUsersPageQuery, AdminUsersPageQueryVariables>(
    ADMIN_USERS_PAGE,
    {
      input: userWhere,
      sortDescriptor,
      pageDescriptor,
      pause: props.loading,
    }
  );

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
              size={'sm'}
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
              size={'sm'}
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
            items: queryData?.usersPage.users || undefined,
            emptyContent: 'No rows to display.',
            isLoading: queryFetching && !queryData,
          }}
          paginationProps={{
            hasMore: queryData?.usersPage?.hasMore,
          }}
        />
      </div>
    </>
  );
};
