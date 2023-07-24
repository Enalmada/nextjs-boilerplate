import React from 'react';
import { type ControlProps } from '@/client/ui/Input/Input';
import {
  Textarea as NextUITextarea,
  type TextAreaProps as NextUITextAreaProps,
} from '@nextui-org/input';
import { Controller } from 'react-hook-form';

interface InputProps extends NextUITextAreaProps {
  radius?: 'sm' | 'md' | 'lg' | 'none' | 'full' | undefined;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, InputProps>(function Textarea(
  { radius = 'sm', ...props },
  ref
) {
  return <NextUITextarea ref={ref} radius={radius} {...props} />;
});

export const TextareaControlled = (args: ControlProps & InputProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
  const errorMessage: string = args.errors[args.name]?.message;

  return (
    <Controller
      control={args.control}
      name={args.name}
      render={({ field }) => (
        <Textarea
          {...field}
          {...args}
          label={args.label}
          labelPlacement={args.labelPlacement || 'outside'}
          validationState={errorMessage ? 'invalid' : 'valid'}
          errorMessage={errorMessage}
        />
      )}
    />
  );
};
