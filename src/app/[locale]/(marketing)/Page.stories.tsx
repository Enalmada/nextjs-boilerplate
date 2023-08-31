import { MarketingLayout as Layout } from '@/app/[locale]/(marketing)/layout';
import Page from '@/app/[locale]/(marketing)/page';
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
