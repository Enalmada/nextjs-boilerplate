import Page from '@/app/[locale]/~offline/page';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Page> = {
  title: 'Pages/Errors',
  component: Page,
  argTypes: {},
  render: () => <Page />,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Page>;
export const Offline: Story = {};
