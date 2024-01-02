import React from 'react';
import { Button } from '@/client/ui';
import { type ButtonProps } from '@nextui-org/react';

const DeleteButton = (props: ButtonProps) => (
  <Button type="button" color="danger" {...props}>
    Delete
  </Button>
);

export default DeleteButton;
