// import { ButtonGroup } from '@/client/ui';
import { Button, ButtonGroup } from '@/client/ui';
import { button, buttonGroup } from '@nextui-org/react';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

const defaultProps = {
  ...button.defaultVariants,
  ...buttonGroup.defaultVariants,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    color: 'primary',
    ...defaultProps,
  },
  render: (args) => (
    <ButtonGroup {...args}>
      {' '}
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  ),
};
