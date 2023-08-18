import { Card, CardBody } from '@/client/ui/Card/Card';
import { card } from '@nextui-org/react';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Card>;

const defaultProps = {
  children: 'Card',
  ...card.defaultVariants,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = {
  args: {
    ...defaultProps,
  },
  render: (args) => (
    <Card {...args}>
      <CardBody>{args.children}</CardBody>
    </Card>
  ),
};
