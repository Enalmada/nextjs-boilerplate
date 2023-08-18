import Page from '@/app/(app)/app/task/[id]/page';
import AppLayout from '@/app/(app)/AppLayout';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Page> = {
  title: 'Pages/App/Task',
  component: Page,
  argTypes: {},
  render: () => (
    <AppLayout>
      <Page params={{ id: 'fakeid' }} />
    </AppLayout>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Page>;
export const Default: Story = {};
