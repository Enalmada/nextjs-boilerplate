// Import this to use fragments in pages
// import { graphql } from '@/client/gql/generated';

import { TASK_PARTS, USER_PARTS } from '@/client/gql/client-queries.gql';
import { gql } from '@urql/core';

// USERS

export const ADMIN_USER_PARTS = gql`
  fragment AdminUserParts on User {
    ...UserParts
    createdAt
    updatedAt
  }
  ${USER_PARTS}
`;

export const ADMIN_ME = gql`
  query AdminMe {
    me {
      ...AdminUserParts
      rules
    }
  }
  ${ADMIN_USER_PARTS}
`;

export const ADMIN_USERS_PAGE = gql`
  query AdminUsersPage($input: QueryUsersPageInput!) {
    usersPage(input: $input) {
      hasMore
      users {
        ...AdminUserParts
      }
    }
  }
  ${ADMIN_USER_PARTS}
`;

export const ADMIN_USER = gql`
  query AdminUser($id: ID!) {
    user(id: $id) {
      ...AdminUserParts
    }
  }
  ${ADMIN_USER_PARTS}
`;

export const ADMIN_UPDATE_USER = gql`
  mutation AdminUpdateUser($id: ID!, $input: MutationUpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      ...UserParts
    }
  }
  ${ADMIN_USER_PARTS}
`;

/* clone-code ENTITY_HOOK
{
  "toPlacement": "bottom",
  "replacements": [
    { "find": "Tasks", "replace": "<%= h.changeCase.camelCase(name) %>" },
    { "find": "TASK", "replace": "<%= h.changeCase.constantCase(name) %>" },
    { "find": "Task", "replace": "<%= h.changeCase.pascalCase(name) %>" },
    { "find": "task", "replace": "<%= h.changeCase.camelCase(name) %>" }
  ]
}
*/
// TASKS

export const ADMIN_TASK_PARTS = gql`
  fragment AdminTaskParts on Task {
    ...TaskParts
    createdAt
    updatedAt
  }
  ${TASK_PARTS}
`;

export const ADMIN_TASKS_PAGE = gql`
  query AdminTasksPage($input: QueryTasksPageInput!) {
    tasksPage(input: $input) {
      hasMore
      tasks {
        ...AdminTaskParts
      }
    }
  }
  ${ADMIN_TASK_PARTS}
`;

export const ADMIN_TASK = gql`
  query AdminTask($id: ID!) {
    task(id: $id) {
      ...AdminTaskParts
    }
  }
  ${ADMIN_TASK_PARTS}
`;

export const ADMIN_UPDATE_TASK = gql`
  mutation AdminUpdateTask($id: ID!, $input: MutationUpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      ...AdminTaskParts
    }
  }
  ${ADMIN_TASK_PARTS}
`;

export const ADMIN_DELETE_TASK = gql`
  mutation AdminDeleteTask($id: ID!) {
    deleteTask(id: $id) {
      ...AdminTaskParts
    }
  }
  ${ADMIN_TASK_PARTS}
`;

/* clone-code ENTITY_HOOK end */

// UPLOAD

export const UPLOAD_FILE = gql`
  mutation UploadFile($file: File!) {
    uploadFile(file: $file) {
      filename
    }
  }
`;

// NOTIFICATIONS

export const PUBLISH_NOTIFICATION = gql`
  mutation PublishNotification($input: MutationPublishNotificationInput!) {
    publishNotification(input: $input) {
      published
    }
  }
`;

export const NOTIFICATION_EVENTS = gql`
  subscription NotificationEvents {
    notificationEvents {
      id
      type
      message
    }
  }
`;
