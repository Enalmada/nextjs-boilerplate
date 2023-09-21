import { useQuery, type DocumentNode, type OperationVariables } from '@apollo/client';
import { type PageDescriptor, type SortDescriptor } from 'nextui-admin';

type UseAdminPageQueryProps<T> = {
  input: T;
  sortDescriptor: SortDescriptor;
  pageDescriptor: PageDescriptor;
};

export const useAdminPageQuery = <T, Q, V extends OperationVariables>(
  query: DocumentNode,
  { input, sortDescriptor, pageDescriptor }: UseAdminPageQueryProps<T>
) => {
  const { data, loading, error } = useQuery<Q, V>(query, {
    fetchPolicy: 'cache-and-network',
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
  });

  return {
    data,
    loading,
    error,
  };
};
