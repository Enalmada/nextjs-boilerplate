import Page from '@/app/[locale]/(app)/app/task/[id]/page';
import AppLayout from '@/app/[locale]/(app)/AppLayout';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Page> = {
  title: 'Pages/App/Task',
  component: Page,
  argTypes: {},
  render: () => (
    <AppLayout>
      <Page params={{ id: 'tsk_1' }} />
    </AppLayout>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Page>;
export const Default: Story = {};
