// Import this to use fragments in pages
// import { graphql } from '@/client/gql/generated';

import { gql } from '@urql/core';

export const USER_PARTS = gql`
  fragment UserParts on User {
    id
    name
    email
    role
    createdAt
    updatedAt
    version
  }
`;

export const TASK_PARTS = gql`
  fragment TaskParts on Task {
    id
    title
    description
    dueDate
    status
    createdAt
    updatedAt
    version
  }
`;

export const ME = gql`
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
`;

export const MY_TASKS = gql`
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
`;

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

export const TASK = gql`
  query Task($id: ID!) {
    task(id: $id) {
      ...TaskParts
    }
  }
  ${TASK_PARTS}
`;

export const CREATE_TASK = gql`
  mutation CreateTask($input: MutationCreateTaskInput!) {
    createTask(input: $input) {
      ...TaskParts
    }
  }
  ${TASK_PARTS}
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $input: MutationUpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      ...TaskParts
    }
  }
  ${TASK_PARTS}
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      ...TaskParts
    }
  }
  ${TASK_PARTS}
`;

// ADMIN
export const USERS = gql`
  query Users {
    users {
      ...UserParts
    }
  }
  ${USER_PARTS}
`;

export const TASKS_PAGE = gql`
  query TasksPage($input: QueryTasksPageInput!) {
    tasksPage(input: $input) {
      hasMore
      tasks {
        ...TaskParts
      }
    }
  }
  ${TASK_PARTS}
`;
