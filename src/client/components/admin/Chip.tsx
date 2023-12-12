import React from 'react';
import { Chip, type ChipProps } from '@nextui-org/react';

interface Props extends ChipProps {
  label: string;
}

const ReadOnlyInput = (props: Props) => (
  <Chip size="sm" variant="flat" {...props}>
    <span className="text-xs capitalize">{props.label}</span>
  </Chip>
);

export default ReadOnlyInput;
