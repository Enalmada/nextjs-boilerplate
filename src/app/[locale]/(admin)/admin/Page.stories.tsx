import React from 'react';
import Loading from '@/app/[locale]/(admin)/admin/loading';
import AdminLayout from '@/app/[locale]/(admin)/AdminLayout';
import TaskList from '@/client/components/tasks/TaskList';
import type { Meta, StoryObj } from '@storybook/react';

import Page from './page';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TaskList> = {
  title: 'Pages/Admin/Home',
  component: TaskList,
  argTypes: {},
  render: () => (
    <AdminLayout>
      <Page />
    </AdminLayout>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof TaskList>;
export const Default: Story = {};

export const AdminTaskListLoading: Story = {
  render: () => (
    <AdminLayout>
      <Loading />
    </AdminLayout>
  ),
};
