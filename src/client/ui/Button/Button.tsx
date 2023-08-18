'use client';

import React from 'react';
import { Button as NextUIButton, type ButtonProps as NextUIButtonProps } from '@nextui-org/react';

interface ButtonProps extends NextUIButtonProps {
  children: React.ReactNode;
  hoverIndication?: boolean;
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | undefined;
  radius?: 'sm' | 'md' | 'lg' | 'none' | 'full' | undefined;
  className?: string;
}

export function Button({
  color = 'primary',
  radius = 'sm',
  hoverIndication = true,
  ...props
}: ButtonProps) {
  // Apply some hover effects
  let className = props.className || '';

  if (hoverIndication && color == 'primary') {
    className = `hover:bg-blue-700 ${className}`;
  }

  if (hoverIndication && color == 'default') {
    className = `hover:bg-gray-400 ${className}`;
  }

  return (
    <NextUIButton color={color} radius={radius} {...props} className={className}>
      {props.children}
    </NextUIButton>
  );
}
