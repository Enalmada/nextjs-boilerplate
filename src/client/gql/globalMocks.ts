import {
  TaskStatus,
  UserRole,
  type MyTasksQuery,
  type Task,
  type User,
} from '@/client/gql/generated/graphql';
import { MY_TASKS, TASK } from '@/client/gql/queries-mutations';
import { faker } from '@faker-js/faker';

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
    email: faker.internet.email(),
    role: faker.helpers.enumValue(UserRole),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    version: 1,
    __typename: 'User',
  };
}

export const tasks = (count = 5) =>
  faker.helpers.multiple(createRandomTask, {
    count,
  });

// Due date needs to be null vs undefined or apollo mock is losing it.
// https://www.apollographql.com/docs/react/errors/#%7B%22version%22%3A%223.8.1%22%2C%22message%22%3A10%2C%22args%22%3A%5B%5D%7D
const meQuery: MyTasksQuery = {
  me: {
    ...createRandomMe(),
    tasks: tasks(5),
  },
};

export const globalMocks = [
  {
    request: {
      query: MY_TASKS,
    },
    result: {
      data: {
        ...meQuery,
      },
    },
  },
  {
    request: {
      query: TASK,
      variables: { id: 'tsk_id' },
    },
    result: {
      data: {
        task: {
          ...createRandomTask('tsk_id'),
        },
      },
    },
  },
];