// Import this to use fragments in pages
import { graphql } from "./graphql";

export const USER_PARTS = graphql(`
  fragment UserParts on User {
    id
    name
    email
    role
    version
  }
`);

export const TASK_PARTS = graphql(`
  fragment TaskParts on Task {
    id
    title
    description
    dueDate
    status
    version
  }
`);

export const ME = graphql(`
  query Me {
    me {
      ...UserParts
      rules
      tasks {
        ...TaskParts
      }
    }
  }
  ${USER_PARTS}
  ${TASK_PARTS}
`);

export const MY_TASKS = graphql(/* GraphQL */ `
  query MyTasks {
    me {
      ...UserParts
      rules
      tasks {
        ...TaskParts
      }
    }
  }
  ${USER_PARTS}
  ${TASK_PARTS}
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

export const TASK = graphql(`
  query Task($id: ID!) {
    task(id: $id) {
      ...TaskParts
    }
  }
  ${TASK_PARTS}
`);

export const CREATE_TASK = graphql(`
  mutation CreateTask($input: MutationCreateTaskInput!) {
    createTask(input: $input) {
      ...TaskParts
    }
  }
  ${TASK_PARTS}
`);

export const UPDATE_TASK = graphql(`
  mutation UpdateTask($id: ID!, $input: MutationUpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      ...TaskParts
    }
  }
  ${TASK_PARTS}
`);

export const DELETE_TASK = graphql(`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      ...TaskParts
    }
  }
  ${TASK_PARTS}
`);
