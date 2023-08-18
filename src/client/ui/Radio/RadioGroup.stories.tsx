import { Radio, RadioGroup } from '@/client/ui';
import { radioGroup } from '@nextui-org/react';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const defaultProps = {
  ...radioGroup.defaultVariants,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    ...defaultProps,
  },
  render: (args) => (
    <RadioGroup {...args} label="Select your favorite city">
      <Radio value="buenos-aires">Buenos Aires</Radio>
      <Radio value="sydney">Sydney</Radio>
      <Radio value="san-francisco">San Francisco</Radio>
      <Radio value="london">London</Radio>
      <Radio value="tokyo">Tokyo</Radio>
    </RadioGroup>
  ),
};
