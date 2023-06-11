import { gql } from "@apollo/client";

export const USERS = gql`
    query Users {
        users {
            id
            name
            email
        }
    }
`;
