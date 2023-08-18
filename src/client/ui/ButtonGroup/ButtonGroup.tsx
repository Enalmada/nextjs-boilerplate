'use client';

import React from 'react';
import {
  ButtonGroup as NextUIButtonGroup,
  type ButtonGroupProps as NextUIButtonGroupProps,
} from '@nextui-org/react';

export function ButtonGroup({ ...props }: NextUIButtonGroupProps) {
  return <NextUIButtonGroup {...props}>{props.children}</NextUIButtonGroup>;
}
