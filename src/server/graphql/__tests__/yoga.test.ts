import { type MeQuery, type MeQueryVariables } from '@/client/gql/generated/graphql';
import { ME } from '@/client/gql/queries-mutations';
import { UserRole, type User } from '@/server/db/schema';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { print, type ExecutionResult } from 'graphql';
import { describe, expect, test, vi } from 'vitest';

import { makeYoga } from '../yoga';

const fixedDate = new Date('2023-08-28T21:37:27.238Z');

const mockTasks = [
  {
    id: 'tsk_1',
    title: 'Task 1',
    description: 'description',
    status: 'ACTIVE',
    dueDate: fixedDate,
    version: 1,
    createdAt: fixedDate,
    updatedAt: fixedDate,
    userId: 'usr_1',
  },
];

const mockUser: User = {
  id: 'usr_1',
  name: 'name',
  email: 'email@email.com',
  createdAt: fixedDate,
  updatedAt: fixedDate,
  version: 1,
  role: UserRole.MEMBER,
  firebaseId: 'random',
  image: 'bla',
};

// children and extra
const mockServerMe = {
  ...mockUser,
  rules: { id: 'usr_1' },
  tasks: null,
};

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
    },
  };
});

vi.mock('@/server/user/user.service', () => {
  return {
    default: class {
      me() {
        return mockServerMe;
      }
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
    const result = await executeOperation<MeQuery, MeQueryVariables>(ME, undefined, {});
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(result.errors[0].message).toEqual('Required CSRF header(s) not present');
  });

  test('execute query operation', async () => {
    const result = await executeOperation<MeQuery, MeQueryVariables>(ME, undefined, {
      authorization: 'bla',
      'x-graphql-yoga-csrf': 'true',
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //const clonedMockTasks = mockTasks.map(({ userId, ...rest }) => rest);
    //const stringifiedMockTasks = JSON.parse(JSON.stringify(clonedMockTasks)); // This will convert Date to their ISO string representation

    const clientResult = {
      ...mockServerMe,
      createdAt: JSON.parse(JSON.stringify(mockServerMe.createdAt)),
      updatedAt: JSON.parse(JSON.stringify(mockServerMe.updatedAt)),
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { firebaseId, image, ...rest } = clientResult;

    expect(result.data?.me).toEqual(rest);
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
