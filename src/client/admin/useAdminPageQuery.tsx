import { type PageDescriptor, type SortDescriptor } from '@enalmada/nextui-admin';
import { useQuery } from '@urql/next';
import { type DocumentNode } from 'graphql';

type UseAdminPageQueryProps<T> = {
  input: T;
  sortDescriptor: SortDescriptor;
  pageDescriptor: PageDescriptor;
};

export const useAdminPageQuery = <T, Q, V extends { [prop: string]: unknown }>(
  query: DocumentNode,
  { input, sortDescriptor, pageDescriptor }: UseAdminPageQueryProps<T>
) => {
  const [{ data, fetching: loading, error }] = useQuery<Q, V>({
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
    requestPolicy: 'cache-and-network', // Added this line for cache-and-network behavior
  });

  return {
    data,
    loading,
    error,
  };
};
