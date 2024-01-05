'use client';

import { type Key } from 'react';
import { useRouter } from 'next/navigation';
import FormErrors from '@/client/admin/table/FormErrors';
import { useAdminTable } from '@/client/admin/table/useAdminTable';
import { ADMIN_USERS_PAGE } from '@/client/gql/admin-queries.gql';
import {
  type AdminUsersPageQuery,
  type AdminUsersPageQueryVariables,
  type User,
  type UserWhere,
} from '@/client/gql/generated/graphql';
import { Button, InputControlled } from '@/client/ui';
import { object, optional, string } from 'valibot';

import { columnProps } from './RenderRows';

interface Props {
  loading?: boolean;
}

export const UserTable = (props: Props) => {
  const router = useRouter();

  const filterSchema = object({
    id: optional(string()),
    email: optional(string()),
  });

  const {
    tableWrapper: { TableWrapperComponent },
    form: {
      formState: { errors, isSubmitting },
      handleSubmit,
      control,
      onSubmit,
    },
    queryResult: { data: queryData, fetching: queryFetching, error: queryError },
  } = useAdminTable<User, UserWhere, AdminUsersPageQuery, AdminUsersPageQueryVariables>(
    ADMIN_USERS_PAGE,
    {
      loading: props.loading,
      filterSchema,
    }
  );

  if (queryError) return <div>{`Error! ${queryError.message}`}</div>;

  //  import { Breadcrumb } from '@/client/ui';
  //  import { getRouteById } from '@/client/utils/routes';
  //       <Breadcrumb routes={[getRouteById('AdminHome'), getRouteById('Users')]} />

  return (
    <>
      <FormErrors errors={errors} />

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
            linkFunction: (id: Key) => router.push(`/admin/user/${id}`),
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
