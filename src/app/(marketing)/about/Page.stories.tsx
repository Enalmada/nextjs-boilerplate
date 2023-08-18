import Page from '@/app/(marketing)/about/page';
import Layout from '@/app/(marketing)/layout';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Page> = {
  title: 'Pages/Marketing/About',
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
