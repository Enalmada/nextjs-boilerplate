import { type MeQuery, type MeQueryVariables } from '@/client/gql/generated/graphql';
import { ME } from '@/client/gql/queries-mutations';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { print, type ExecutionResult } from 'graphql';

import { graphqlServer } from '../server';

/*
import { mockTask } from '@/server/task/task.service.test';
import { mockUser, mockUserId } from '@/server/user/user.service.test';
const mockTasks = [mockTask];

// children and extra
const mockServerMe = {
  ...mockUser,
  rules: { id: mockUserId },
  tasks: null,
};

vi.mock('@/server/graphql/handleCreateOrGetUser', () => {
  return {
    handleCreateOrGetUser: vi.fn(() => mockUser),
  };
});

vi.mock('@/server/task/task.service', () => {
  return {
    default: class {
      list() {
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

 */

async function executeOperation<TResult, TVariables>(
  operation: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables extends Record<string, never> ? [] : [TVariables],
  headers?: Record<string, unknown>
): Promise<ExecutionResult<TResult>> {
  const response = await graphqlServer('/api/graphql').fetch('http://yoga/api/graphql', {
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
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('execute query operation unauthenticated', async () => {
    const result = await executeOperation<MeQuery, MeQueryVariables>(ME, undefined, {});
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // Due to error masking "Required CSRF header(s) not present" is only available in dev
    expect(result.errors[0].message).toEqual('Unexpected error.');
  });

  // TODO somehow the mocks here are messing up other tests
  /*
  test('execute query operation', async () => {
    const result = await executeOperation<MeQuery, MeQueryVariables>(ME, undefined, {
      authorization: 'bla',
      'x-graphql-csrf': 'true',
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

   */

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
