/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access  */
import { ME, MY_TASKS, TASK } from '@/client/gql/client-queries.gql';
import {
  TaskStatus,
  UserRole,
  type MyTasksQuery,
  type Task,
  type User,
} from '@/client/gql/generated/graphql';
import { type Mock } from '@enalmada/storybook-addon-mock-urql';
import { faker } from '@faker-js/faker';

// Chromatic (storybook review tool) needs a consistent seed
faker.seed(124);

export function createRandomBase() {
  return {
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    version: 1,
  };
}

export function createRandomTask(id?: string): Task {
  return {
    id: id || 'tsk_' + faker.string.nanoid(),
    title: faker.lorem.words(2),
    description: faker.helpers.arrayElement([null, faker.lorem.sentence()]),
    dueDate: faker.helpers.arrayElement([null, faker.date.soon()]),
    status: faker.helpers.enumValue(TaskStatus),
    ...createRandomBase(),
    __typename: 'Task',
  };
}

export function createRandomMe(id?: string): User {
  return {
    id: id || 'usr_' + faker.string.nanoid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.enumValue(UserRole),
    rules: '[["manage","all"]]',
    tasks: null,
    ...createRandomBase(),
    __typename: 'User',
  };
}

export const tasks = (count = 5) =>
  faker.helpers.multiple(createRandomTask, {
    count,
  });

// Due date needs to be null vs undefi
// ned or apollo mock is losing it.
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
