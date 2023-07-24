import React from 'react';
import { Radio as NextUIRadio, type RadioProps as NextUIRadioProps } from '@nextui-org/radio';

interface RadioProps extends NextUIRadioProps {
  size?: 'sm' | 'md' | 'lg';
}

export const Radio = React.forwardRef<HTMLLabelElement, RadioProps>(
  ({ size = 'md', ...props }, ref) => {
    return <NextUIRadio as={undefined} size={size} ref={ref} {...props} />;
  }
);

Radio.displayName = 'Radio';
