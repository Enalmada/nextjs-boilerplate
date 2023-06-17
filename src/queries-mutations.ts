import { graphql } from "@/gql"

export const allFilmsWithVariablesQueryDocument = graphql(/* GraphQL */ `
    query Users {
        users {
            id
            name
            email
        }
    }
`);
