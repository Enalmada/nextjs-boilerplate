'use client';

import React from 'react';
import {
  Card as NextUICard,
  CardBody as NextUICardBody,
  type CardProps as NextUICardProps,
} from '@nextui-org/react';

export const Card = ({ ...props }: NextUICardProps) => {
  return <NextUICard as={'div'} {...props} />;
};

export const CardBody = ({ ...props }) => {
  return <NextUICardBody {...props} />;
};
