import { ProfileWrapper } from '@/app/(app)/app/profile/UserProfile/UserProfile';
import AppLayout from '@/app/(app)/AppLayout';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ProfileWrapper> = {
  title: 'Pages/App/Profile',
  component: ProfileWrapper,
  argTypes: {},
  render: () => (
    <AppLayout>
      <ProfileWrapper />
    </AppLayout>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof ProfileWrapper>;
export const Default: Story = {};
