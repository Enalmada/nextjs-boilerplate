import Layout from '@/app/(marketing)/layout';
import Page from '@/app/(marketing)/pricing/page';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Page> = {
  title: 'Pages/Marketing/Pricing',
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
