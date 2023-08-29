import { type TasksQuery } from '@/client/gql/generated/graphql';
import { TASKS } from '@/client/gql/queries-mutations';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { print, type ExecutionResult } from 'graphql';
import { describe, expect, test, vi } from 'vitest';

import { makeYoga } from '../yoga';

const mockUser = { id: 1, name: 'User' };
const fixedDate = new Date('2023-08-28T21:37:27.238Z');

const mockTasks = [
  {
    id: '1',
    title: 'Task 1',
    description: 'description',
    status: 'ACTIVE',
    dueDate: fixedDate,
    version: 1,
    createdAt: fixedDate,
    updatedAt: fixedDate,
    userId: '1',
  },
];

vi.mock('@/server/graphql/modifiedHandleCreateOrGetUser', () => {
  return {
    modifiedHandleCreateOrGetUser: vi.fn(() => mockUser),
  };
});

vi.mock('@/server/task/task.service', () => {
  return {
    default: class {
      tasks() {
        return mockTasks;
      }
      // Add other methods if needed
    },
  };
});

async function executeOperation<TResult, TVariables>(
  operation: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables extends Record<string, never> ? [] : [TVariables],
  headers?: Record<string, unknown>
): Promise<ExecutionResult<TResult>> {
  const response = await makeYoga('/api/graphql').fetch('http://yoga/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
    body: JSON.stringify({
      query: print(operation),
      variables: variables ?? undefined,
    }),
  });
  return (await response.json()) as ExecutionResult<TResult>;
}

describe('Yoga Tests', () => {
  test('execute query operation unauthenticated', async () => {
    const result = await executeOperation<TasksQuery, unknown>(TASKS, undefined, {});
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(result.errors[0].message).toEqual('Required CSRF header(s) not present');
  });

  test('execute query operation', async () => {
    const result = await executeOperation<TasksQuery, unknown>(TASKS, undefined, {
      authorization: 'bla',
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const clonedMockTasks = mockTasks.map(({ userId, ...rest }) => rest);
    const stringifiedMockTasks = JSON.parse(JSON.stringify(clonedMockTasks)); // This will convert Date to their ISO string representation

    expect(result.data?.tasks).toEqual(stringifiedMockTasks);
  });

  /*
  test('execute mutation operation', async () => {
    const EchoMutation = graphql(`
        mutation EchoMutation($message: String!) {
            echo(message: $message)
        }
    `)

      const result = await executeOperation(EchoMutation, {
          message: 'Ohayoo!'
      })

      expect(result.data?.echo).toEqual('Ohayoo!')
  })
*/
});
