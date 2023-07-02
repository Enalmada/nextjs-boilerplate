import { graphql } from "@/client/gql";

/*
export const TASK_PARTS = graphql( `
  fragment TaskParts on Task {
    id
    title
    description
    dueDate
    status
    createdAt
    updatedAt
  }
`);
*/

export const TASKS = graphql(/* GraphQL */ `
  query Tasks {
    tasks {
      id
      title
      description
      dueDate
      status
      createdAt
      updatedAt
    }
  }
`);

export const TASK = graphql(/* GraphQL */ `
  query Task($input: FindTaskInput!) {
    task(input: $input) {
      id
      title
      description
      dueDate
      status
      createdAt
      updatedAt
    }
  }
`);

export const UPSERT_TASK = graphql(/* GraphQL */ `
  mutation UpsertTask($input: TaskInput!) {
    upsertTask(input: $input) {
      id
      title
      description
      dueDate
      status
      createdAt
      updatedAt
    }
  }
`);

export const DELETE_TASK = graphql(/* GraphQL */ `
  mutation DeleteTask($id: String!) {
    deleteTask(id: $id) {
      id
      title
      description
      dueDate
      status
      createdAt
      updatedAt
    }
  }
`);
