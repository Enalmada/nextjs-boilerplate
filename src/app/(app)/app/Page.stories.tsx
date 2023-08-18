import React from 'react';
import Loading from '@/app/(app)/app/loading';
import { PageContent } from '@/app/(app)/app/PageContent';
import AppLayout from '@/app/(app)/AppLayout';
import TaskList from '@/client/components/tasks/TaskList';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TaskList> = {
  title: 'Pages/App/TaskList',
  component: TaskList,
  argTypes: {},
  render: () => (
    <AppLayout>
      <PageContent>
        <TaskList />
      </PageContent>
    </AppLayout>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof TaskList>;
export const Default: Story = {};

export const TaskListLoading: Story = {
  render: () => (
    <AppLayout>
      <Loading />
    </AppLayout>
  ),
};
