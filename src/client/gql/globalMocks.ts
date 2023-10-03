/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access  */
import {
  TaskStatus,
  UserRole,
  type MyTasksQuery,
  type Task,
  type User,
} from '@/client/gql/generated/graphql';
import { ME, MY_TASKS, TASK } from '@/client/gql/queries-mutations';
import { faker } from '@faker-js/faker';
import { type Operation, type OperationResult } from '@urql/core';
import { type DocumentNode, type OperationDefinitionNode } from 'graphql';

// Chromatic (storybook review tool) needs a consistent seed
faker.seed(124);

export function createRandomTask(id?: string): Task {
  return {
    id: id || 'tsk_' + faker.string.nanoid(),
    title: faker.lorem.words(2),
    description: faker.helpers.arrayElement([null, faker.lorem.sentence()]),
    dueDate: faker.helpers.arrayElement([null, faker.date.soon()]),
    status: faker.helpers.enumValue(TaskStatus),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    version: 1,
    __typename: 'Task',
  };
}

export function createRandomMe(id?: string): User {
  return {
    id: id || 'usr_' + faker.string.nanoid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.enumValue(UserRole),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    version: 1,
    rules: '[["manage","all"]]',
    tasks: null,
    __typename: 'User',
  };
}

export const tasks = (count = 5) =>
  faker.helpers.multiple(createRandomTask, {
    count,
  });

// Due date needs to be null vs undefined or apollo mock is losing it.
// https://www.apollographql.com/docs/react/errors/#%7B%22version%22%3A%223.8.1%22%2C%22message%22%3A10%2C%22args%22%3A%5B%5D%7D
export const meQuery = (count = 5): MyTasksQuery => {
  return {
    me: {
      ...createRandomMe(),
      tasks: tasks(count),
    },
  };
};

export const globalMocks: Mock[] = [
  {
    request: {
      query: ME,
    },
    response: {
      result: {
        data: {
          ...meQuery(),
        },
      },
    },
  },
  {
    request: {
      query: MY_TASKS,
    },
    response: {
      result: {
        data: {
          ...meQuery(),
        },
      },
    },
  },
  {
    request: {
      query: TASK,
      variables: { id: 'tsk_1' },
    },
    response: {
      result: {
        data: {
          task: {
            ...createRandomTask('tsk_1'),
          },
        },
      },
    },
  },
];

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type Mock = {
  request: {
    query: DocumentNode;
    variables?: Operation['variables'];
    method?: RequestMethod;
  };
  response: {
    status?: number; // http status codes, optional with default of 200
    delay?: number; // milliseconds, optional
    result: Partial<OperationResult>;
  };
};

// TODO - consider just using lodash for the following.
// Trying to avoid dependencies for 1 off
// import isEqual from 'lodash/isEqual';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deepEqual = (a: any, b: any): boolean => {
  if ((a == null || Object.keys(a).length === 0) && (b == null || Object.keys(b).length === 0))
    return true;
  if (a == null || Object.keys(a).length === 0 || b == null || Object.keys(b).length === 0)
    return false;
  if (typeof a !== 'object' || typeof b !== 'object') return a === b;

  const keysA = Object.keys(a);
  const keysB = new Set(Object.keys(b));

  if (keysA.length !== keysB.size) return false;

  for (const key of keysA) {
    if (!keysB.has(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
};

const getOperationNameFromQuery = (query: DocumentNode): string | undefined => {
  const operationNode = query.definitions.find(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    (def): def is OperationDefinitionNode => def.kind === 'OperationDefinition'
  );
  return operationNode?.name?.value;
};

export const findDataByOperationNameAndVariables = (
  operationName: string,
  variables: { [key: string]: any },
  requestMethod: RequestMethod
) => {
  const mock = globalMocks.find((mock: Mock) => {
    const mockOperationName = getOperationNameFromQuery(mock.request.query);
    const mockMethod = mock.request.method || 'POST'; // Default to POST if not specified
    return (
        mockOperationName === operationName &&
        deepEqual(mock.request.variables, variables) &&
        mockMethod === requestMethod
    );
  });

  if (mock) {
    return {
      method: mock.request.method || 'POST', // If for some reason it's undefined, default here
      status: mock.response.status || 200,
      delay: mock.response.delay,
      ...mock.response.result,
    };
  }

  return {
    status: 400,
    errors: [
      {
        message: `No mock available for operation: ${operationName} with method: ${requestMethod} and variables: ${JSON.stringify(
          variables
        )}`,
      },
    ],
  };
};

export type MockRequest = {
  body: any;
  method: RequestMethod;
  url: string;
  signal?: any; // replace `any` with the proper type if known
  searchParams?: { [key: string]: string };
};
