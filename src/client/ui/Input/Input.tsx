/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';

import React from 'react';
import { Input as NextUIInput, type InputProps as NextUIInputProps } from '@nextui-org/react';
import { Controller, type Control } from 'react-hook-form';

interface InputProps extends NextUIInputProps {
  radius?: 'sm' | 'md' | 'lg' | 'none' | 'full' | undefined;
}

// export const Input = ({ radius = 'sm', ...props }: InputProps) => <NextUIInput  radius={radius} {...props} />;
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { radius = 'sm', ...props },
  ref
) {
  return <NextUIInput ref={ref} radius={radius} {...props} />;
});

export interface ControlProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any> | undefined;
  label?: string;
  labelPlacement?: string;
}

// Using controller until this is fixed
// https://github.com/nextui-org/nextui/issues/1969

export const InputControlled = (args: ControlProps & InputProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
  const errorMessage: string = args.errors[args.name]?.message;

  return (
    <Controller
      control={args.control}
      name={args.name}
      render={({ field }) => (
        <Input
          {...field}
          {...args}
          type={args.type || undefined}
          value={field.value ?? ''} // Convert null or undefined to an empty string for SSR
          label={args.label}
          labelPlacement={args.labelPlacement || 'outside'}
          isInvalid={!!errorMessage}
          errorMessage={errorMessage}
        />
      )}
    />
  );
};
