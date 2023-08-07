import React from 'react';
import {
  Skeleton as NextUISkeleton,
  type SkeletonProps as NextUISkeletonProps,
} from '@nextui-org/skeleton';

export const Skeleton = ({ ...props }: NextUISkeletonProps) => {
  return props.isLoaded ? (
    props.children
  ) : (
    <NextUISkeleton {...props}>{props.children}</NextUISkeleton>
  );
};
