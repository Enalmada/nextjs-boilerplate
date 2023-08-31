import AuthLayout from '@/app/[locale]/(auth)/AuthLayout';
import Redirecting from '@/client/components/auth/Redirecting';
import type { Meta, StoryObj } from '@storybook/react';

// Don't hit the actual logout logic
const meta: Meta<typeof Redirecting> = {
  title: 'Pages/App/Logout',
  component: Redirecting,
  argTypes: {},
  render: () => (
    <AuthLayout>
      <Redirecting>Logging out</Redirecting>
    </AuthLayout>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Redirecting>;
export const Default: Story = {};
