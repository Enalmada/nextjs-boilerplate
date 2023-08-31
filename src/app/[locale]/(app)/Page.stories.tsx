import AppLayout from '@/app/[locale]/(app)/AppLayout';
import Loading from '@/app/[locale]/(app)/loading';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Loading> = {
  title: 'Pages/App/Loading',
  component: Loading,
  argTypes: {},
  render: () => (
    <AppLayout>
      <Loading />
    </AppLayout>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Loading>;
export const AppLoading: Story = {};
