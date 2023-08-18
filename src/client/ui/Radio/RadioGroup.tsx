'use client';

import React from 'react';
import { type ControlProps } from '@/client/ui/Input/Input';
import {
  RadioGroup as NextUIRadioGroup,
  type RadioGroupProps as NextUIRadioGroupProps,
} from '@nextui-org/react';
import { Controller } from 'react-hook-form';

interface RadioGroupProps extends NextUIRadioGroupProps {
  color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | undefined;
  disableAnimation: boolean;
  size: 'sm' | 'md' | 'lg' | undefined;
}

export const RadioGroup = React.forwardRef<HTMLInputElement, RadioGroupProps>(function RadioGroup(
  { color = 'primary', size = 'md', ...props },
  ref
) {
  return <NextUIRadioGroup color={color} size={size} ref={ref} {...props} />;
});

export const RadioGroupControlled = (args: ControlProps & RadioGroupProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
  const errorMessage: string = args.errors[args.name]?.message;

  return (
    <Controller
      control={args.control}
      name={args.name}
      render={({ field }) => (
        <RadioGroup
          {...args}
          {...field}
          label={args.label}
          validationState={errorMessage ? 'invalid' : 'valid'}
          errorMessage={errorMessage}
        >
          {args.children}
        </RadioGroup>
      )}
    />
  );
};
