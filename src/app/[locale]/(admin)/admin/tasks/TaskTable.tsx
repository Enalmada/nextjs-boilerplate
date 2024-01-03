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

import { type Key } from 'react';
import { useRouter } from 'next/navigation';
import FormErrors from '@/client/admin/table/FormErrors';
import { useAdminTable } from '@/client/admin/table/useAdminTable';
import { ADMIN_TASKS_PAGE } from '@/client/gql/admin-queries.gql';
import {
  type AdminTasksPageQuery,
  type AdminTasksPageQueryVariables,
  type Task,
  type TaskWhere,
} from '@/client/gql/generated/graphql';
import { Button, InputControlled } from '@/client/ui';
import { object, optional, string } from 'valibot';

import { columnProps } from './RenderRows';

interface Props {
  loading?: boolean;
}

export const TaskTable = (props: Props) => {
  const router = useRouter();

  const filterSchema = object({
    id: optional(string()),
    title: optional(string()),
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
  } = useAdminTable<Task, TaskWhere, AdminTasksPageQuery, AdminTasksPageQueryVariables>(
    ADMIN_TASKS_PAGE,
    {
      loading: props.loading,
      filterSchema,
    }
  );

  if (queryError) return <div>{`Error! ${queryError.message}`}</div>;

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
            linkFunction: (id: Key) => router.push(`/admin/tasks/${id}`),
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
