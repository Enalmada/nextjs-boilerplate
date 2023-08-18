import Page from '@/app/error';
import type { Meta, StoryObj } from '@storybook/react';

import NextError from './error';
import NextGlobalError from './global-error';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Page> = {
  title: 'Pages/Errors',
  component: Page,
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Page>;
export const Error: Story = {
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <NextError
      reset={() => null}
      error={{ name: 'MockError', message: 'This is a mock error', digest: 'bla' }}
    />
  ),
};

export const GlobalError: Story = {
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <NextGlobalError
      reset={() => null}
      error={{ name: 'MockError', message: 'This is a mock error', digest: 'bla' }}
    />
  ),
};
