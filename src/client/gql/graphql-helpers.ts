/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/ban-ts-comment,@typescript-eslint/no-unsafe-call */
import { type ApolloCache, type DocumentNode } from '@apollo/client';

// https://christianlydemann.com/graphql-cache-updates-made-easy/
export interface EntityObject {
  id: string;
}

export function optimisticResponseHelper<UpdateMutationResponseT>(
  mutationName: string,
  content: object
): UpdateMutationResponseT {
  return {
    __typename: 'Mutation',
    [mutationName]: {
      __typename: 'bla', // this is now coming with the content
      id: '-1',
      ...content,
    },
  } as UpdateMutationResponseT;
}

type NestedKey<T> = T extends object
  ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    { [K in keyof T]: K | `${K}.${NestedKey<T[K]>}` }[keyof T]
  : never;

export function addToCache<ReadQueryResponseT>(
  toCreate: EntityObject | undefined,
  readQuery: DocumentNode,
  cache: ApolloCache<unknown>,
  entityName: NestedKey<ReadQueryResponseT>
) {
  const existingEntities = cache.readQuery<ReadQueryResponseT>({
    query: readQuery,
  });

  if (toCreate && existingEntities) {
    // apollo requires clone to trigger immutable update
    const clonedEntities = { ...existingEntities };
    const keys = (entityName as string).split('.');
    let current = clonedEntities;
    for (let i = 0; i < keys.length - 1; i++) {
      // @ts-ignore
      current[keys[i]] = { ...current[keys[i]] }; // Shallow clone each nested object
      // @ts-ignore
      current = current[keys[i]];
    }
    const lastKey = keys[keys.length - 1];
    // @ts-ignore
    current[lastKey] = [...current[lastKey], toCreate];

    cache.writeQuery({
      query: readQuery,
      data: clonedEntities,
    });
  }
}

export function removeFromCache<ReadQueryResponseT>(
  toRemove: EntityObject | undefined | null,
  readQuery: DocumentNode,
  cache: ApolloCache<unknown>,
  entityName: NestedKey<ReadQueryResponseT>
) {
  const existingEntities = cache.readQuery<ReadQueryResponseT>({
    query: readQuery,
  });

  if (toRemove && existingEntities) {
    // apollo requires clone to trigger immutable update
    const clonedEntities = { ...existingEntities };
    const keys = (entityName as string).split('.');
    let current = clonedEntities;
    for (let i = 0; i < keys.length - 1; i++) {
      // @ts-ignore
      current[keys[i]] = { ...current[keys[i]] }; // Shallow clone each nested object
      // @ts-ignore
      current = current[keys[i]];
    }
    const lastKey = keys[keys.length - 1];
    // @ts-ignore
    current[lastKey] = current[lastKey].filter((entity: any) => entity.id !== toRemove.id);

    cache.writeQuery({
      query: readQuery,
      data: clonedEntities,
    });

    cache.evict({ id: toRemove.id });
  }
}
