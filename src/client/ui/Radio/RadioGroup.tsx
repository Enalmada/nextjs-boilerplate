/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { forwardRef } from 'react';
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
  mapValueToRadio?: (value: boolean | null) => string;
  mapRadioToValue?: (value: string) => boolean | null;
}

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(function RadioGroup(
  { color = 'primary', size = 'md', ...props },
  ref
) {
  return <NextUIRadioGroup color={color} size={size} ref={ref} {...props} />;
});

export const RadioGroupControlled = (args: ControlProps & RadioGroupProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
  const errorMessage: string = args.errors[args.name]?.message;

  const { mapValueToRadio, mapRadioToValue, ...otherArgs } = args;

  return (
    <Controller
      control={args.control}
      name={args.name}
      render={({ field }) => (
        <RadioGroup
          {...otherArgs}
          {...field}
          value={
            mapValueToRadio
              ? mapValueToRadio(field.value as boolean | null)
              : (field.value as string)
          }
          onChange={
            mapRadioToValue
              ? (e) => field.onChange(mapRadioToValue(e.target.value))
              : field.onChange
          }
          label={args.label}
          isInvalid={!!errorMessage}
          errorMessage={errorMessage}
        >
          {args.children}
        </RadioGroup>
      )}
    />
  );
};
