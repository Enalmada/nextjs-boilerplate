/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-argument */

import { useState } from 'react';
import { useAdminPageQuery } from '@/client/admin/table/useAdminPageQuery';
import { useTableWrapper } from '@enalmada/nextui-admin';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { type DocumentNode } from 'graphql/index';
import { useForm, type DefaultValues } from 'react-hook-form';
import { type ObjectSchema } from 'valibot';

type UseAdminTableProps<TWhere> = {
  loading?: boolean;
  filterSchema?: ObjectSchema<any>;
  queryConfig?: any;
  defaultFilter?: TWhere | (() => TWhere);
};

export const useAdminTable = <
  TEntity,
  TWhere extends Record<string, any>,
  TPageQuery,
  TPageQueryVariables extends { [prop: string]: unknown },
>(
  query: DocumentNode,
  { loading, filterSchema, queryConfig, defaultFilter }: UseAdminTableProps<TWhere>
) => {
  const tableWrapper = useTableWrapper<TEntity>();

  const [filter, setFilter] = useState<TWhere>((defaultFilter as TWhere) ?? ({} as TWhere));

  const form = useForm<TWhere>({
    resolver: filterSchema ? valibotResolver(filterSchema) : undefined,
    defaultValues: filter as DefaultValues<TWhere>,
  });

  const onSubmit = (formData: TWhere) => {
    // Transform each string field: if it's an empty string, set it to undefined
    // This is necessary to handle inputs being changed from containing text to empty.
    const transformedFormData: TWhere = Object.fromEntries(
      Object.entries(formData as Record<string, any>).map(([key, value]) => [
        key,
        value === '' ? undefined : value,
      ])
    ) as TWhere;

    setFilter(transformedFormData);
  };

  const queryResult = useAdminPageQuery<TWhere, TPageQuery, TPageQueryVariables>(
    query,
    {
      input: filter,
      sortDescriptor: tableWrapper.sortDescriptor,
      pageDescriptor: tableWrapper.pageDescriptor,
      pause: loading,
    },
    queryConfig
  );

  return {
    tableWrapper,
    filterState: { filter, setFilter },
    form: {
      ...form,
      onSubmit,
    },
    queryResult,
  };
};
