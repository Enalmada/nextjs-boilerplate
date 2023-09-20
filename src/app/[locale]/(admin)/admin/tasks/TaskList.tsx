'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  SortOrder,
  type Task,
  type TasksPageQuery,
  type TasksPageQueryVariables,
} from '@/client/gql/generated/graphql';
import { TASKS_PAGE } from '@/client/gql/queries-mutations';
import { Button, InputControlled } from '@/client/ui';
import { useQuery } from '@apollo/client';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { type SortDescriptor } from '@nextui-org/react';
import { TableWrapper, type PageDescriptor } from 'nextui-admin';
import { useForm } from 'react-hook-form';
import { object, string } from 'valibot';

import { columns, renderTable } from './RenderTable';

export const TaskList = () => {
  const router = useRouter();

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'id',
    direction: 'descending',
  });

  const [pageDescriptor, setPageDescriptor] = useState<PageDescriptor>({
    page: 1,
    pageSize: 50,
  });

  type FormData = {
    id?: string;
    title?: string;
  };

  const [taskWhere, setTaskWhere] = useState<FormData>({
    id: undefined,
    title: undefined,
  });

  const schema = object({
    id: string(),
    title: string(),
  });

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
  } = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      id: '',
      title: '', // necessary for SSR to maintain controlled component
    },
  });

  const onSubmit = ({ id, title }: FormData) => {
    setTaskWhere({
      id: id || undefined,
      title: title || undefined,
    });
  };

  const linkFunction = (id: React.Key) => router.push(`/admin/tasks/${id}`);

  const {
    data: dataQuery,
    loading,
    error: errorQuery,
  } = useQuery<TasksPageQuery, TasksPageQueryVariables>(TASKS_PAGE, {
    fetchPolicy: 'cache-and-network', // cache-and-network for changes and deletes
    variables: {
      input: {
        where: {
          ...taskWhere,
        },
        order: {
          sortBy: sortDescriptor.column as string,
          sortOrder: sortDescriptor.direction === 'ascending' ? SortOrder.Asc : SortOrder.Desc,
        },
        pagination: {
          page: pageDescriptor.page,
          pageSize: pageDescriptor.pageSize,
        },
      },
    },
  });

  if (errorQuery) return <div>{`Error! ${errorQuery.message}`}</div>;

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
              name="title"
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
      <div className="mx-auto w-full max-w-[95rem]">
        <TableWrapper<Task>
          sortDescriptor={sortDescriptor}
          setSortDescriptor={setSortDescriptor}
          columns={columns}
          items={dataQuery?.tasksPage?.tasks || undefined}
          renderRow={renderTable}
          emptyContent={'No rows to display.'}
          pagingDescriptor={{
            pageDescriptor: pageDescriptor,
            setPageDescriptor: setPageDescriptor,
            hasMore: dataQuery?.tasksPage?.hasMore,
          }}
          isLoading={loading && !dataQuery}
          linkFunction={linkFunction}
        />
      </div>
    </>
  );
};
