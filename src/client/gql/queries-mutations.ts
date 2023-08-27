import { graphql } from '@/client/gql/generated';

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
      version
    }
  }
`);

/*
export const TASK = graphql(`
  query Task($id: ID!) {
    task(id: $id) {
      ... on BaseError {
        message
      }
      ... on NotFoundError {
        message
      }
      ... on UnauthorizedError {
        message
      }
      ... on Task {
        id
        title
        description
        dueDate
        status
        createdAt
        updatedAt
      }
    }
  }
`);
 */

export const TASK = graphql(/* GraphQL */ `
  query Task($id: ID!) {
    task(id: $id) {
      id
      title
      description
      dueDate
      status
      createdAt
      updatedAt
      version
    }
  }
`);

export const CREATE_TASK = graphql(/* GraphQL */ `
  mutation CreateTask($input: MutationCreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      dueDate
      status
      createdAt
      updatedAt
      version
    }
  }
`);

export const UPDATE_TASK = graphql(/* GraphQL */ `
  mutation UpdateTask($id: ID!, $input: MutationUpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      title
      description
      dueDate
      status
      createdAt
      updatedAt
      version
    }
  }
`);

export const DELETE_TASK = graphql(/* GraphQL */ `
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
      title
      description
      dueDate
      status
      createdAt
      updatedAt
      version
    }
  }
`);
