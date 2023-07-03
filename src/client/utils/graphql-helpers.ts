import { type ApolloCache, type DocumentNode } from "@apollo/client";

// https://christianlydemann.com/graphql-cache-updates-made-easy/
export interface EntityObject {
  id: string;
}

export function optimisticResponseHelper<UpdateMutationResponseT>(
  mutationName: string,
  content: object
): UpdateMutationResponseT {
  return {
    __typename: "Mutation",
    [mutationName]: {
      __typename: "bla", // this is now coming with the content
      id: "-1",
      ...content,
    },
  } as UpdateMutationResponseT;
}

export function removeFromCache<ReadQueryResponseT>(
  toRemove: EntityObject | undefined,
  readQuery: DocumentNode,
  cache: ApolloCache<unknown>,
  entityName: keyof ReadQueryResponseT
) {
  const existingEntities = cache.readQuery<Record<keyof ReadQueryResponseT, EntityObject[]>>({
    query: readQuery,
  });

  if (toRemove && existingEntities) {
    cache.writeQuery({
      query: readQuery,
      data: {
        [entityName]: existingEntities[entityName].filter((entity) => entity.id !== toRemove.id),
      },
    });
    cache.evict({ id: toRemove.id });
  }
}
