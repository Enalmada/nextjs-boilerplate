import AuthLayout from '@/app/[locale]/(auth)/AuthLayout';
import Page from '@/app/[locale]/(auth)/maintenance-mode/page';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Page> = {
  title: 'Pages/Auth/MaintenanceMode',
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
export const Default: Story = {};
