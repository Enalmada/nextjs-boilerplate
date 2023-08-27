import { TaskBody } from '@/client/components/tasks/Task';
import { TaskStatus } from '@/client/gql/generated/graphql';
import { createRandomTask } from '@/client/gql/globalMocks';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TaskBody> = {
  title: 'UI/Task',
  component: TaskBody,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TaskBody>;

const defaultProps = {
  task: {
    ...createRandomTask('12345'),
  },
};
export const Default: Story = {
  args: {
    task: defaultProps.task,
  },
};
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Loading: Story = {
  args: {
    task: undefined,
  },
};

export const NoDescription: Story = {
  args: {
    ...defaultProps,
    task: {
      ...defaultProps.task,
      description: undefined,
    },
  },
};

export const DueDate: Story = {
  args: {
    ...defaultProps,
    task: {
      ...defaultProps.task,
      dueDate: new Date(),
    },
  },
};

export const Done: Story = {
  args: {
    ...defaultProps,
    task: {
      ...defaultProps.task,
      status: TaskStatus.Completed,
    },
  },
};
