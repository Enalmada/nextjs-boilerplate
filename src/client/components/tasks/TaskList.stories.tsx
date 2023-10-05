import TaskList, { TaskListLoading } from '@/client/components/tasks/TaskList';
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

export const Loading: Story = {
  render: () => <TaskListLoading />,
};

export const Empty: Story = {
  args: {},
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
