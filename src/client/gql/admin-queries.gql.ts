// Import this to use fragments in pages

import { TASK_PARTS, USER_PARTS } from "./client-queries.gql";
import { graphql } from "./graphql";

// USERS

export const ADMIN_USER_PARTS = graphql(`
  fragment AdminUserParts on User {
    ...UserParts
    createdAt
    updatedAt
  }
  ${USER_PARTS}
`);

export const ADMIN_ME = graphql(`
  query AdminMe {
    me {
      ...AdminUserParts
      rules
    }
  }
  ${ADMIN_USER_PARTS}
`);

export const ADMIN_USERS_PAGE = graphql(`
  query AdminUsersPage($input: QueryUsersPageInput!) {
    usersPage(input: $input) {
      hasMore
      users {
        ...AdminUserParts
        tasks {
          id
          title
        }
      }
    }
  }
  ${ADMIN_USER_PARTS}
`);

export const ADMIN_USER = graphql(`
  query AdminUser($id: ID!) {
    user(id: $id) {
      ...AdminUserParts
    }
  }
  ${ADMIN_USER_PARTS}
`);

export const ADMIN_UPDATE_USER = graphql(`
  mutation AdminUpdateUser($id: ID!, $input: MutationUpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      ...AdminUserParts
    }
  }
  ${ADMIN_USER_PARTS}
`);

export const ADMIN_DELETE_USER = graphql(`
  mutation AdminDeleteUser($id: ID!) {
    deleteUser(id: $id) {
      ...AdminUserParts
    }
  }
  ${ADMIN_USER_PARTS}
`);

/* clone-code ENTITY_HOOK
{
  "toPlacement": "bottom",
  "replacements": [
    { "find": "Tasks", "replace": "<%= h.inflection.pluralize(h.changeCase.pascalCase(name)) %>" },
    { "find": "TASK", "replace": "<%= h.changeCase.constantCase(name) %>" },
    { "find": "Task", "replace": "<%= h.changeCase.pascalCase(name) %>" },
    { "find": "task", "replace": "<%= h.changeCase.camelCase(name) %>" }
  ]
}
*/
// TASKS

export const ADMIN_TASK_PARTS = graphql(`
  fragment AdminTaskParts on Task {
    ...TaskParts
    createdAt
    updatedAt
  }
  ${TASK_PARTS}
`);

export const ADMIN_TASKS_PAGE = graphql(`
  query AdminTasksPage($input: QueryTasksPageInput!) {
    tasksPage(input: $input) {
      hasMore
      tasks {
        ...AdminTaskParts
        user {
          id
          name
          email
        }
      }
    }
  }
  ${ADMIN_TASK_PARTS}
`);

export const ADMIN_TASK = graphql(`
  query AdminTask($id: ID!) {
    task(id: $id) {
      ...AdminTaskParts
    }
  }
  ${ADMIN_TASK_PARTS}
`);

export const ADMIN_UPDATE_TASK = graphql(`
  mutation AdminUpdateTask($id: ID!, $input: MutationUpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      ...AdminTaskParts
    }
  }
  ${ADMIN_TASK_PARTS}
`);

export const ADMIN_DELETE_TASK = graphql(`
  mutation AdminDeleteTask($id: ID!) {
    deleteTask(id: $id) {
      ...AdminTaskParts
    }
  }
  ${ADMIN_TASK_PARTS}
`);

/* clone-code ENTITY_HOOK end */

// UPLOAD

export const UPLOAD_FILE = graphql(`
  mutation UploadFile($file: File!) {
    uploadFile(file: $file) {
      filename
    }
  }
`);

// NOTIFICATIONS

export const PUBLISH_NOTIFICATION = graphql(`
  mutation PublishNotification($input: MutationPublishNotificationInput!) {
    publishNotification(input: $input) {
      published
    }
  }
`);

export const NOTIFICATION_EVENTS = graphql(`
  subscription NotificationEvents {
    notificationEvents {
      id
      type
      message
    }
  }
`);
