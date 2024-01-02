/* clone-code ENTITY_HOOK
{
  "toFile": "src/app/[locale]/(admin)/admin/<%= h.inflection.pluralize(h.changeCase.camelCase(name)) %>/<%= h.changeCase.pascalCase(name) %>Table.tsx",
  "replacements": [
    { "find": "Task", "replace": "<%= h.changeCase.pascalCase(name) %>" },
    { "find": "task", "replace": "<%= h.changeCase.camelCase(name) %>" },
    { "find": "TASK", "replace": "<%= h.changeCase.constantCase(name) %>" }
  ]
}
*/
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminPageQuery } from '@/client/admin/useAdminPageQuery';
import { ADMIN_TASKS_PAGE } from '@/client/gql/admin-queries.gql';
import {
  type AdminTasksPageQuery,
  type AdminTasksPageQueryVariables,
  type Task,
  type TaskWhere,
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

export const TaskTable = (props: Props) => {
  const router = useRouter();

  const { TableWrapperComponent, sortDescriptor, pageDescriptor } = useTableWrapper<Task>();

  const [taskWhere, setTaskWhere] = useState<TaskWhere>();

  const schema = object({
    id: optional(string()),
    title: optional(string()),
  });

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
  } = useForm<TaskWhere>({
    resolver: valibotResolver(schema),
    defaultValues: {
      ...taskWhere,
    },
  });

  const onSubmit = (formData: TaskWhere) => {
    // Transform each string field: if it's an empty string, set it to undefined
    const transformedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value === '' ? undefined : value])
    );
    setTaskWhere({
      ...transformedFormData,
    });
  };

  const {
    data: queryData,
    fetching: queryFetching,
    error: queryError,
  } = useAdminPageQuery<TaskWhere, AdminTasksPageQuery, AdminTasksPageQueryVariables>(
    ADMIN_TASKS_PAGE,
    {
      input: taskWhere,
      sortDescriptor,
      pageDescriptor,
      pause: props.loading,
    }
  );

  if (queryError) return <div>{`Error! ${queryError.message}`}</div>;

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
              name="title"
              size={'sm'}
              control={control}
              placeholder={'Title'}
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
            linkFunction: (id: React.Key) => router.push(`/admin/tasks/${id}`),
          }}
          columnProps={columnProps}
          bodyProps={{
            items: queryData?.tasksPage.tasks || undefined,
            emptyContent: 'No rows to display.',
            isLoading: queryFetching && !queryData,
          }}
          paginationProps={{
            hasMore: queryData?.tasksPage?.hasMore,
          }}
        />
      </div>
    </>
  );
};
