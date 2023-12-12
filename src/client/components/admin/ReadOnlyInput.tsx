import { Input } from '@/client/ui';
import { type InputProps as NextUIInputProps } from '@nextui-org/react';

const ReadOnlyInput = (props: NextUIInputProps) => (
  <div className={'mb-10'}>
    <Input
      {...props}
      size={'md'}
      isDisabled
      isReadOnly
      type="text"
      label={props.label}
      defaultValue={props.defaultValue}
      labelPlacement={props.labelPlacement || 'outside'}
    />
  </div>
);

export default ReadOnlyInput;
