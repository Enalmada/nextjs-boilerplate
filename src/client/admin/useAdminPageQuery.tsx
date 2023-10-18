import { useQuery } from '@enalmada/next-gql/client';
import { type PageDescriptor, type SortDescriptor } from '@enalmada/nextui-admin';
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
    // May need this depending on how real time the data needs to be
    // requestPolicy: 'cache-and-network',
  });

  return {
    data,
    loading,
    error,
  };
};
