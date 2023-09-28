/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment UserParts on User {\n    id\n    name\n    email\n    role\n    createdAt\n    updatedAt\n    version\n  }\n": types.UserPartsFragmentDoc,
    "\n  fragment TaskParts on Task {\n    id\n    title\n    description\n    dueDate\n    status\n    createdAt\n    updatedAt\n    version\n  }\n": types.TaskPartsFragmentDoc,
    "\n  query Me {\n    me {\n      ...UserParts\n      rules\n    }\n  }\n  \n": types.MeDocument,
    "\n  query MyTasks {\n    me {\n      ...UserParts\n      rules\n      tasks {\n        ...TaskParts\n      }\n    }\n  }\n  \n  \n": types.MyTasksDocument,
    "\n  query Task($id: ID!) {\n    task(id: $id) {\n      ...TaskParts\n    }\n  }\n  \n": types.TaskDocument,
    "\n  mutation CreateTask($input: MutationCreateTaskInput!) {\n    createTask(input: $input) {\n      ...TaskParts\n    }\n  }\n  \n": types.CreateTaskDocument,
    "\n  mutation UpdateTask($id: ID!, $input: MutationUpdateTaskInput!) {\n    updateTask(id: $id, input: $input) {\n      ...TaskParts\n    }\n  }\n  \n": types.UpdateTaskDocument,
    "\n  mutation DeleteTask($id: ID!) {\n    deleteTask(id: $id) {\n      ...TaskParts\n    }\n  }\n  \n": types.DeleteTaskDocument,
    "\n  query Users {\n    users {\n      ...UserParts\n    }\n  }\n  \n": types.UsersDocument,
    "\n  query TasksPage($input: QueryTasksPageInput!) {\n    tasksPage(input: $input) {\n      hasMore\n      tasks {\n        ...TaskParts\n      }\n    }\n  }\n  \n": types.TasksPageDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserParts on User {\n    id\n    name\n    email\n    role\n    createdAt\n    updatedAt\n    version\n  }\n"): (typeof documents)["\n  fragment UserParts on User {\n    id\n    name\n    email\n    role\n    createdAt\n    updatedAt\n    version\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TaskParts on Task {\n    id\n    title\n    description\n    dueDate\n    status\n    createdAt\n    updatedAt\n    version\n  }\n"): (typeof documents)["\n  fragment TaskParts on Task {\n    id\n    title\n    description\n    dueDate\n    status\n    createdAt\n    updatedAt\n    version\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      ...UserParts\n      rules\n    }\n  }\n  \n"): (typeof documents)["\n  query Me {\n    me {\n      ...UserParts\n      rules\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MyTasks {\n    me {\n      ...UserParts\n      rules\n      tasks {\n        ...TaskParts\n      }\n    }\n  }\n  \n  \n"): (typeof documents)["\n  query MyTasks {\n    me {\n      ...UserParts\n      rules\n      tasks {\n        ...TaskParts\n      }\n    }\n  }\n  \n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Task($id: ID!) {\n    task(id: $id) {\n      ...TaskParts\n    }\n  }\n  \n"): (typeof documents)["\n  query Task($id: ID!) {\n    task(id: $id) {\n      ...TaskParts\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTask($input: MutationCreateTaskInput!) {\n    createTask(input: $input) {\n      ...TaskParts\n    }\n  }\n  \n"): (typeof documents)["\n  mutation CreateTask($input: MutationCreateTaskInput!) {\n    createTask(input: $input) {\n      ...TaskParts\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateTask($id: ID!, $input: MutationUpdateTaskInput!) {\n    updateTask(id: $id, input: $input) {\n      ...TaskParts\n    }\n  }\n  \n"): (typeof documents)["\n  mutation UpdateTask($id: ID!, $input: MutationUpdateTaskInput!) {\n    updateTask(id: $id, input: $input) {\n      ...TaskParts\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteTask($id: ID!) {\n    deleteTask(id: $id) {\n      ...TaskParts\n    }\n  }\n  \n"): (typeof documents)["\n  mutation DeleteTask($id: ID!) {\n    deleteTask(id: $id) {\n      ...TaskParts\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Users {\n    users {\n      ...UserParts\n    }\n  }\n  \n"): (typeof documents)["\n  query Users {\n    users {\n      ...UserParts\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TasksPage($input: QueryTasksPageInput!) {\n    tasksPage(input: $input) {\n      hasMore\n      tasks {\n        ...TaskParts\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  query TasksPage($input: QueryTasksPageInput!) {\n    tasksPage(input: $input) {\n      hasMore\n      tasks {\n        ...TaskParts\n      }\n    }\n  }\n  \n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;