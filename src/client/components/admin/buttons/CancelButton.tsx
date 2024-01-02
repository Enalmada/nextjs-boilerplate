import React from 'react';
import NextLink from 'next/link';
import { Button } from '@/client/ui';
import { type ButtonProps } from '@nextui-org/react';

const CancelButton = (props: ButtonProps) => (
  <Button as={NextLink} color={'default'} {...props}>
    Cancel
  </Button>
);

export default CancelButton;
