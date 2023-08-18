'use client';

import React from 'react';
import {
  Skeleton as NextUISkeleton,
  type SkeletonProps as NextUISkeletonProps,
} from '@nextui-org/react';

export const Skeleton = ({ ...props }: NextUISkeletonProps) => {
  return props.isLoaded ? (
    props.children
  ) : (
    <NextUISkeleton {...props}>{props.children}</NextUISkeleton>
  );
};
