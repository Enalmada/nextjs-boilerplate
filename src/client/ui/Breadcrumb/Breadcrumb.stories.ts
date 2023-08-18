import { Breadcrumb } from '@/client/ui';
import { getRouteById } from '@/client/utils/routes';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

const defaultProps = {
  routes: [getRouteById('Home'), getRouteById('Task')],
};

export const Default: Story = {
  args: {
    ...defaultProps,
  },
};
