/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-argument */
import { useQuery } from '@enalmada/next-gql/client';
import { type PageDescriptor, type SortDescriptor } from '@enalmada/nextui-admin';
import { type DocumentNode } from 'graphql';

type UseAdminPageQueryProps<T> = {
  input: T;
  sortDescriptor: SortDescriptor;
  pageDescriptor: PageDescriptor;
  pause?: boolean;
};

export const useAdminPageQuery = <T, Q, V extends { [prop: string]: unknown }>(
  query: DocumentNode,
  { input, sortDescriptor, pageDescriptor }: UseAdminPageQueryProps<T>,
  config?: any
) => {
  const [{ data, fetching, error }] = useQuery<Q, V>({
    query: query,
    variables: {
      input: {
        where: { ...input },
        order: {
          sortBy: sortDescriptor.column,
          sortOrder: sortDescriptor.direction === 'ascending' ? 'ASC' : 'DESC',
        },
        pagination: {
          page: pageDescriptor.page,
          pageSize: pageDescriptor.pageSize,
        },
      },
    } as unknown as V,
    // May not need this depending on real time requirements. Here for delete example to work
    // TODO consider clearing cache on add/delete
    // https://github.com/urql-graphql/urql/issues/297#issuecomment-504782794
    requestPolicy: 'cache-and-network',
    ...config,
  });

  return {
    data,
    fetching,
    error,
  };
};
