/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-argument */

import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@enalmada/next-gql/client';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { type DocumentNode } from 'graphql/index';
import { useForm, type DefaultValues } from 'react-hook-form';
import { type ObjectSchema } from 'valibot';

type UseAdminEditProps = {
  formSchema?: ObjectSchema<any>;
  reUrl: string;
};

type QueryData = {
  [key: string]: any; // This index signature states that queryData can be indexed with a string, and will return any type.
};

export const useAdminEdit = <
  TPageQuery,
  TPageQueryVariables extends { [prop: string]: unknown },
  TUpdateMutationQuery,
  TUpdateMutationQueryVariables extends { [prop: string]: unknown },
  TUpdateMutationInput extends Record<string, any>,
  TDeleteMutationQuery,
  TDeleteMutationQueryVariables extends { [prop: string]: unknown },
>(
  id: string | undefined,
  typeName: string,
  query: DocumentNode,
  updateMutationQuery: DocumentNode,
  deleteMutationQuery: DocumentNode,
  { formSchema, reUrl }: UseAdminEditProps
) => {
  const router = useRouter();

  const [queryResult] = useQuery<TPageQuery>({
    query: query,
    variables: { id } as unknown as TPageQueryVariables,
    pause: id === undefined,
  });

  // Create and Update loading is handled by form submitting
  // mutation error will render errors but not handle them
  // https://stackoverflow.com/questions/59465864/handling-errors-with-react-apollo-usemutation-hook
  const updateMutation = useMutation<TUpdateMutationQuery, TUpdateMutationQueryVariables>(
    updateMutationQuery
  );

  const deleteMutation = useMutation<TDeleteMutationQuery, TDeleteMutationQueryVariables>(
    deleteMutationQuery
  );

  // '' necessary for inputs using this in SSR to maintain controlled component
  const form = useForm<TUpdateMutationInput>({
    resolver: formSchema ? valibotResolver(formSchema) : undefined,
    defaultValues: {
      ...((queryResult.data
        ? (queryResult.data as QueryData)[typeName]
        : {}) as DefaultValues<TUpdateMutationInput>),
    },
  });

  const transformFormData = (formData: TUpdateMutationInput): TUpdateMutationInput => {
    return Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value === '' ? null : value])
    ) as TUpdateMutationInput;
  };

  const [{}, updateTask] = updateMutation;

  // queryResult.data ? (queryResult.data as QueryData)[typeName].version : 0
  const onSubmit = async (formData: TUpdateMutationInput) => {
    const transformedData = transformFormData(formData);

    const result = await updateTask({
      id: id!,
      input: {
        ...transformedData,
      },
    } as unknown as TUpdateMutationQueryVariables);

    if (result.data) {
      router.push(reUrl);
    }
  };

  const [{}, deleteTask] = deleteMutation;

  const handleDelete = async () => {
    const result = await deleteTask({
      id: id!,
      // TODO when optimistic errors are handled
      // optimisticResponse: optimisticResponseHelper<DeleteTaskMutation>('deleteTask', props.task),
      //update(cache, { data }) {
      //   void removeFromCache<MyTasksQuery>(data?.deleteTask, TASKS, cache, 'tasks');
      //},
    } as unknown as TDeleteMutationQueryVariables);
    if (result.data) {
      router.push(reUrl);
    }
  };

  return {
    queryResult,
    updateMutation,
    deleteMutation,
    form: {
      ...form,
      onSubmit,
    },
    handleDelete,
  };
};
