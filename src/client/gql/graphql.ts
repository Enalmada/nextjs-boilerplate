import { initGraphQLTada } from "gql.tada";
import type { introspection } from "../gql/generated/graphql-env.d.ts";

export const graphql = initGraphQLTada<{
	introspection: introspection;
	scalars: {
		DateTime: string;
		NonEmptyString: string;
	};
}>();

export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
export { readFragment } from "gql.tada";
