import AuthLayout from '@/app/[locale]/(auth)/AuthLayout';
import Page from '@/app/[locale]/(auth)/loading';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Page> = {
  title: 'Pages/Auth/Loading',
  component: Page,
  argTypes: {},
  render: () => (
    <AuthLayout>
      <Page />
    </AuthLayout>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Page>;
export const AuthLoading: Story = {};
