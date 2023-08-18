import { TaskStatus, type Task, type TasksQuery } from '@/client/gql/generated/graphql';
import { TASK, TASKS } from '@/client/gql/queries-mutations';
import { faker } from '@faker-js/faker';

// Chromatic (storybook review tool) needs a consistent seed
faker.seed(124);

export function createRandomTask(id?: string): Task {
  return {
    id: id || faker.string.uuid(),
    title: faker.lorem.words(2),
    description: faker.helpers.arrayElement([null, faker.lorem.sentence()]),
    dueDate: faker.helpers.arrayElement([null, faker.date.soon()]),
    status: faker.helpers.enumValue(TaskStatus),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    __typename: 'Task',
  };
}

export const tasks = (count = 5) =>
  faker.helpers.multiple(createRandomTask, {
    count,
  });

// Due date needs to be null vs undefined or apollo mock is losing it.
// https://www.apollographql.com/docs/react/errors/#%7B%22version%22%3A%223.8.1%22%2C%22message%22%3A10%2C%22args%22%3A%5B%5D%7D
const taskQuery: TasksQuery = {
  tasks: tasks(5),
};

export const globalMocks = [
  {
    request: {
      query: TASKS,
    },
    result: {
      data: {
        ...taskQuery,
      },
    },
  },
  {
    request: {
      query: TASK,
      variables: { id: 'fakeid' },
    },
    result: {
      data: {
        task: {
          ...createRandomTask('fakeid'),
        },
      },
    },
  },
];
