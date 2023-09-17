import TaskList, { TaskListLoading } from '@/client/components/tasks/TaskList';
import { globalMocks, tasks } from '@/client/gql/globalMocks';
import { MY_TASKS } from '@/client/gql/queries-mutations';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TaskList> = {
  title: 'UI/TaskList',
  component: TaskList,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TaskList>;

//   const { id, title, description, dueDate, status } = props.task;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {},
};

Default.parameters = {
  apolloClient: {
    mocks: [...globalMocks],
  },
};

export const Loading: Story = {
  render: () => <TaskListLoading />,
};

export const Empty: Story = {
  args: {},
};

Empty.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: MY_TASKS,
        },
        result: {
          data: {
            tasks: tasks(0),
          },
        },
      },
    ],
  },
};

// Can't get network error to work
/*
const apolloError = new ApolloError({
  graphQLErrors: [new GraphQLError('SLOT_ALREADY_BOOKED')],
  networkError: null,
});

export const NetworkError: Story = {
};

NetworkError.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: TASKS,
        },
        error: 'bla'
      },
    ],
  },
};

 */
