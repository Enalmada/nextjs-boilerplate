/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: Date; output: Date; }
  File: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** A string that cannot be passed as an empty value */
  NonEmptyString: { input: string; output: string; }
};

export type BaseEntity = {
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedBy?: Maybe<User>;
  version: Scalars['Int']['output'];
};

/** The query mutation type. */
export type Mutation = {
  __typename?: 'Mutation';
  createTask: Task;
  deleteTask?: Maybe<Task>;
  deleteUser?: Maybe<User>;
  publishNotification?: Maybe<NotificationResponse>;
  updateTask?: Maybe<Task>;
  updateUser?: Maybe<User>;
  uploadFile: UploadResponse;
};


/** The query mutation type. */
export type MutationCreateTaskArgs = {
  input: MutationCreateTaskInput;
};


/** The query mutation type. */
export type MutationDeleteTaskArgs = {
  id: Scalars['ID']['input'];
};


/** The query mutation type. */
export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


/** The query mutation type. */
export type MutationPublishNotificationArgs = {
  input: MutationPublishNotificationInput;
};


/** The query mutation type. */
export type MutationUpdateTaskArgs = {
  id: Scalars['ID']['input'];
  input: MutationUpdateTaskInput;
};


/** The query mutation type. */
export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: MutationUpdateUserInput;
};


/** The query mutation type. */
export type MutationUploadFileArgs = {
  file: Scalars['File']['input'];
};

export type MutationCreateTaskInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  status: TaskStatus;
  title: Scalars['NonEmptyString']['input'];
};

export type MutationPublishNotificationInput = {
  message?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUpdateTaskInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  status: TaskStatus;
  title: Scalars['NonEmptyString']['input'];
  version: Scalars['Int']['input'];
};

export type MutationUpdateUserInput = {
  role: UserRole;
  version: Scalars['Int']['input'];
};

/** When a notification is posted */
export type NotificationEvent = {
  __typename?: 'NotificationEvent';
  id: Scalars['ID']['output'];
  /** Notification message */
  message: Scalars['String']['output'];
  /** Notification type */
  type: NotificationEventType;
};

export enum NotificationEventType {
  SystemNotification = 'SystemNotification'
}

export type NotificationResponse = {
  __typename?: 'NotificationResponse';
  published: Scalars['Boolean']['output'];
};

export type OrderInput = {
  sortBy: Scalars['String']['input'];
  sortOrder: SortOrder;
};

export type PaginationInput = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

/** The query root type. */
export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  task?: Maybe<Task>;
  tasksPage: TaskPage;
  user?: Maybe<User>;
  usersPage: UserPage;
};


/** The query root type. */
export type QueryTaskArgs = {
  id: Scalars['ID']['input'];
};


/** The query root type. */
export type QueryTasksPageArgs = {
  input: QueryTasksPageInput;
};


/** The query root type. */
export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


/** The query root type. */
export type QueryUsersPageArgs = {
  input: QueryUsersPageInput;
};

export type QueryTasksPageInput = {
  order?: InputMaybe<OrderInput>;
  pagination?: InputMaybe<PaginationInput>;
  where?: InputMaybe<TaskWhere>;
};

export type QueryUsersPageInput = {
  order?: InputMaybe<OrderInput>;
  pagination?: InputMaybe<PaginationInput>;
  where?: InputMaybe<UserWhere>;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** The query subscription type. */
export type Subscription = {
  __typename?: 'Subscription';
  /** Events related to notifications */
  notificationEvents: NotificationEvent;
};

export type Task = BaseEntity & {
  __typename?: 'Task';
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  status: TaskStatus;
  title: Scalars['NonEmptyString']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedBy?: Maybe<User>;
  user?: Maybe<User>;
  version: Scalars['Int']['output'];
};

/** Type used for querying paginated tasks */
export type TaskPage = {
  __typename?: 'TaskPage';
  hasMore: Scalars['Boolean']['output'];
  tasks: Array<Task>;
};

export enum TaskStatus {
  Active = 'ACTIVE',
  Completed = 'COMPLETED'
}

export type TaskWhere = {
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type UploadResponse = {
  __typename?: 'UploadResponse';
  filename: Scalars['String']['output'];
};

export type User = BaseEntity & {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  role: UserRole;
  rules?: Maybe<Scalars['JSON']['output']>;
  tasks?: Maybe<Array<Task>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedBy?: Maybe<User>;
  version: Scalars['Int']['output'];
};

/** Type used for querying paginated users */
export type UserPage = {
  __typename?: 'UserPage';
  hasMore: Scalars['Boolean']['output'];
  users: Array<User>;
};

export enum UserRole {
  Admin = 'ADMIN',
  Member = 'MEMBER'
}

export type UserWhere = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type AdminUserPartsFragment = { __typename?: 'User', createdAt: Date, updatedAt?: Date | null, id: string, name?: string | null, email?: string | null, role: UserRole, version: number };

export type AdminMeQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminMeQuery = { __typename?: 'Query', me?: { __typename?: 'User', rules?: any | null, createdAt: Date, updatedAt?: Date | null, id: string, name?: string | null, email?: string | null, role: UserRole, version: number } | null };

export type AdminUsersPageQueryVariables = Exact<{
  input: QueryUsersPageInput;
}>;


export type AdminUsersPageQuery = { __typename?: 'Query', usersPage: { __typename?: 'UserPage', hasMore: boolean, users: Array<{ __typename?: 'User', createdAt: Date, updatedAt?: Date | null, id: string, name?: string | null, email?: string | null, role: UserRole, version: number, tasks?: Array<{ __typename?: 'Task', id: string, title: string }> | null }> } };

export type AdminUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type AdminUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', createdAt: Date, updatedAt?: Date | null, id: string, name?: string | null, email?: string | null, role: UserRole, version: number } | null };

export type AdminUpdateUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: MutationUpdateUserInput;
}>;


export type AdminUpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', createdAt: Date, updatedAt?: Date | null, id: string, name?: string | null, email?: string | null, role: UserRole, version: number } | null };

export type AdminDeleteUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type AdminDeleteUserMutation = { __typename?: 'Mutation', deleteUser?: { __typename?: 'User', createdAt: Date, updatedAt?: Date | null, id: string, name?: string | null, email?: string | null, role: UserRole, version: number } | null };

export type AdminTaskPartsFragment = { __typename?: 'Task', createdAt: Date, updatedAt?: Date | null, id: string, title: string, description?: string | null, dueDate?: Date | null, status: TaskStatus, version: number };

export type AdminTasksPageQueryVariables = Exact<{
  input: QueryTasksPageInput;
}>;


export type AdminTasksPageQuery = { __typename?: 'Query', tasksPage: { __typename?: 'TaskPage', hasMore: boolean, tasks: Array<{ __typename?: 'Task', createdAt: Date, updatedAt?: Date | null, id: string, title: string, description?: string | null, dueDate?: Date | null, status: TaskStatus, version: number, user?: { __typename?: 'User', id: string, name?: string | null, email?: string | null } | null }> } };

export type AdminTaskQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type AdminTaskQuery = { __typename?: 'Query', task?: { __typename?: 'Task', createdAt: Date, updatedAt?: Date | null, id: string, title: string, description?: string | null, dueDate?: Date | null, status: TaskStatus, version: number } | null };

export type AdminUpdateTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: MutationUpdateTaskInput;
}>;


export type AdminUpdateTaskMutation = { __typename?: 'Mutation', updateTask?: { __typename?: 'Task', createdAt: Date, updatedAt?: Date | null, id: string, title: string, description?: string | null, dueDate?: Date | null, status: TaskStatus, version: number } | null };

export type AdminDeleteTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type AdminDeleteTaskMutation = { __typename?: 'Mutation', deleteTask?: { __typename?: 'Task', createdAt: Date, updatedAt?: Date | null, id: string, title: string, description?: string | null, dueDate?: Date | null, status: TaskStatus, version: number } | null };

export type UploadFileMutationVariables = Exact<{
  file: Scalars['File']['input'];
}>;


export type UploadFileMutation = { __typename?: 'Mutation', uploadFile: { __typename?: 'UploadResponse', filename: string } };

export type PublishNotificationMutationVariables = Exact<{
  input: MutationPublishNotificationInput;
}>;


export type PublishNotificationMutation = { __typename?: 'Mutation', publishNotification?: { __typename?: 'NotificationResponse', published: boolean } | null };

export type NotificationEventsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NotificationEventsSubscription = { __typename?: 'Subscription', notificationEvents: { __typename?: 'NotificationEvent', id: string, type: NotificationEventType, message: string } };

export type UserPartsFragment = { __typename?: 'User', id: string, name?: string | null, email?: string | null, role: UserRole, version: number };

export type TaskPartsFragment = { __typename?: 'Task', id: string, title: string, description?: string | null, dueDate?: Date | null, status: TaskStatus, version: number };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', rules?: any | null, id: string, name?: string | null, email?: string | null, role: UserRole, version: number, tasks?: Array<{ __typename?: 'Task', id: string, title: string, description?: string | null, dueDate?: Date | null, status: TaskStatus, version: number }> | null } | null };

export type MyTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type MyTasksQuery = { __typename?: 'Query', me?: { __typename?: 'User', rules?: any | null, id: string, name?: string | null, email?: string | null, role: UserRole, version: number, tasks?: Array<{ __typename?: 'Task', id: string, title: string, description?: string | null, dueDate?: Date | null, status: TaskStatus, version: number }> | null } | null };

export type TaskQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type TaskQuery = { __typename?: 'Query', task?: { __typename?: 'Task', id: string, title: string, description?: string | null, dueDate?: Date | null, status: TaskStatus, version: number } | null };

export type CreateTaskMutationVariables = Exact<{
  input: MutationCreateTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: string, title: string, description?: string | null, dueDate?: Date | null, status: TaskStatus, version: number } };

export type UpdateTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: MutationUpdateTaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask?: { __typename?: 'Task', id: string, title: string, description?: string | null, dueDate?: Date | null, status: TaskStatus, version: number } | null };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask?: { __typename?: 'Task', id: string, title: string, description?: string | null, dueDate?: Date | null, status: TaskStatus, version: number } | null };

export const UserPartsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<UserPartsFragment, unknown>;
export const AdminUserPartsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserParts"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<AdminUserPartsFragment, unknown>;
export const TaskPartsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<TaskPartsFragment, unknown>;
export const AdminTaskPartsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminTaskParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskParts"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<AdminTaskPartsFragment, unknown>;
export const AdminMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminUserParts"}},{"kind":"Field","name":{"kind":"Name","value":"rules"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserParts"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<AdminMeQuery, AdminMeQueryVariables>;
export const AdminUsersPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminUsersPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryUsersPageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersPage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminUserParts"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserParts"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<AdminUsersPageQuery, AdminUsersPageQueryVariables>;
export const AdminUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminUserParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserParts"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<AdminUserQuery, AdminUserQueryVariables>;
export const AdminUpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminUpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MutationUpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminUserParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserParts"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<AdminUpdateUserMutation, AdminUpdateUserMutationVariables>;
export const AdminDeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminDeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminUserParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserParts"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<AdminDeleteUserMutation, AdminDeleteUserMutationVariables>;
export const AdminTasksPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminTasksPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryTasksPageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tasksPage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminTaskParts"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminTaskParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskParts"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<AdminTasksPageQuery, AdminTasksPageQueryVariables>;
export const AdminTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"task"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminTaskParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminTaskParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskParts"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<AdminTaskQuery, AdminTaskQueryVariables>;
export const AdminUpdateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminUpdateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MutationUpdateTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminTaskParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminTaskParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskParts"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<AdminUpdateTaskMutation, AdminUpdateTaskMutationVariables>;
export const AdminDeleteTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminDeleteTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminTaskParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminTaskParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskParts"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<AdminDeleteTaskMutation, AdminDeleteTaskMutationVariables>;
export const UploadFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"File"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filename"}}]}}]}}]} as unknown as DocumentNode<UploadFileMutation, UploadFileMutationVariables>;
export const PublishNotificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PublishNotification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MutationPublishNotificationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publishNotification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"published"}}]}}]}}]} as unknown as DocumentNode<PublishNotificationMutation, PublishNotificationMutationVariables>;
export const NotificationEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"NotificationEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notificationEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<NotificationEventsSubscription, NotificationEventsSubscriptionVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserParts"}},{"kind":"Field","name":{"kind":"Name","value":"rules"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskParts"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const MyTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserParts"}},{"kind":"Field","name":{"kind":"Name","value":"rules"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskParts"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<MyTasksQuery, MyTasksQueryVariables>;
export const TaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Task"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"task"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<TaskQuery, TaskQueryVariables>;
export const CreateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MutationCreateTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<CreateTaskMutation, CreateTaskMutationVariables>;
export const UpdateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MutationUpdateTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const DeleteTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<DeleteTaskMutation, DeleteTaskMutationVariables>;