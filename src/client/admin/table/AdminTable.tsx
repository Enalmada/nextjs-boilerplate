/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-argument */

import { useState, type Key } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FormFields, {
  generateFormSchema,
  type FormFieldConfig,
} from '@/client/admin/edit/formGeneration';
import FormErrors from '@/client/admin/table/FormErrors';
import { useAdminPageQuery } from '@/client/admin/table/useAdminPageQuery';
import { Button } from '@/client/ui';
import { useTableWrapper, type TableColumnProps } from '@enalmada/nextui-admin';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { type DocumentNode } from 'graphql/index';
import { useForm, type DefaultValues } from 'react-hook-form';

type UseAdminTableProps<TEntity> = {
  inputConfig: FormFieldConfig[];
  query: DocumentNode;
  basePath: string;
  pageName: string;
  entityKey: string;
  loading?: boolean;
  queryConfig?: any;
  columnProps: TableColumnProps<TEntity>[];
};

const AdminTable = <
  TEntity,
  TWhere extends Record<string, any>,
  TPageQuery,
  TPageQueryVariables extends { [prop: string]: unknown },
>({
  columnProps,
  inputConfig,
  query,
  basePath,
  loading,
  queryConfig,
  pageName,
  entityKey,
}: UseAdminTableProps<TEntity>) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialFilter = Object.fromEntries(inputConfig.map(({ key }) => [key, '']));

  const defaultFilter = Array.from(searchParams.entries()).reduce((acc, [key, value]) => {
    // @ts-expect-error string key
    acc[key] = value || undefined;
    return acc;
  }, initialFilter);

  const filterSchema = generateFormSchema(inputConfig);

  const { TableWrapperComponent, sortDescriptor, pageDescriptor } = useTableWrapper<TEntity>();

  const [filter, setFilter] = useState<TWhere>(
    (defaultFilter as TWhere) ?? (initialFilter as TWhere)
  );

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
  } = useForm<TWhere>({
    resolver: filterSchema ? valibotResolver(filterSchema) : undefined,
    defaultValues: filter as DefaultValues<TWhere>,
  });

  const transformFormData = (formData: TWhere): TWhere => {
    return Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value === '' ? undefined : value])
    ) as TWhere;
  };

  const onSubmit = (formData: TWhere) => {
    setFilter(formData);
  };

  const {
    data: queryData,
    fetching: queryFetching,
    error: queryError,
  } = useAdminPageQuery<TWhere, TPageQuery, TPageQueryVariables>(
    query,
    {
      input: transformFormData(filter),
      sortDescriptor: sortDescriptor,
      pageDescriptor: pageDescriptor,
      pause: loading,
    },
    queryConfig
  );

  if (queryError) return <div>{`Error! ${queryError.message}`}</div>;

  return (
    <>
      <FormErrors errors={errors} />

      <div className="gap-4">
        <form
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
          className="flex w-full flex-wrap items-start items-center gap-4"
        >
          <FormFields control={control} errors={errors} config={inputConfig} horizontal={true} />

          <Button
            data-testid="submit"
            size="lg"
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
            linkFunction: (id: Key) => router.push(`${basePath}/${id}`),
          }}
          columnProps={columnProps as unknown as TableColumnProps<TEntity>[]}
          bodyProps={{
            // @ts-expect-error types
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            items: (queryData?.[pageName]?.[entityKey] as TEntity) || undefined,
            emptyContent: 'No rows to display.',
            isLoading: queryFetching && !queryData,
          }}
          paginationProps={{
            // @ts-expect-error types
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            hasMore: queryData?.[pageName]?.hasMore as boolean,
          }}
        />
      </div>
    </>
  );
};

export default AdminTable;
