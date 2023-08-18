import Layout from '@/app/(marketing)/layout';
import Page from '@/app/(marketing)/page';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Page> = {
  title: 'Pages/Marketing/Home',
  component: Page,
  argTypes: {},
  render: () => (
    <Layout>
      <Page />
    </Layout>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Default: Story = {};
