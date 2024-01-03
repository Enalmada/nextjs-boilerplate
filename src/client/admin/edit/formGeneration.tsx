/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputControlled, Radio, RadioGroupControlled, TextareaControlled } from '@/client/ui';
import DatePicker from '@/client/ui/DateInput';
import {
  type Control,
  type DeepRequired,
  type FieldErrorsImpl,
  type FieldValues,
} from 'react-hook-form';
import { object, required, type BaseSchema } from 'valibot';

export interface FormFieldConfig {
  key: string;
  label?: string;
  component: 'input' | 'textarea' | 'radio' | 'date' | 'hidden';
  validation?: BaseSchema;
  enum?: Record<string, any>;
  defaultValue?: string;
  isReadOnly?: boolean;
  isDisabled?: boolean;
}

export const generateFormSchema = (config: FormFieldConfig[]) => {
  const schemaFields = config.reduce<Record<string, BaseSchema>>((acc, field) => {
    if (field.validation) {
      acc[field.key] = field.validation;
    }
    return acc;
  }, {});

  return required(object(schemaFields));
};

interface FormFieldProps<T extends FieldValues> {
  config: FormFieldConfig[];
  control: Control<T>;
  errors: Partial<FieldErrorsImpl<DeepRequired<T>>>;
}

const FormFields = <T extends FieldValues>({ config, control, errors }: FormFieldProps<T>) => {
  const labelPlacement = 'inside';

  return (
    <div className="grid grid-flow-row gap-4">
      {config.map((field) => {
        switch (field.component) {
          case 'input':
            return (
              <InputControlled
                key={field.key}
                name={field.key}
                control={control}
                label={field.label}
                errors={errors}
                labelPlacement={labelPlacement}
                isDisabled={field.isDisabled}
                isReadOnly={field.isReadOnly}
              />
            );
          case 'textarea':
            return (
              <TextareaControlled
                key={field.key}
                name={field.key}
                control={control}
                label={field.label}
                errors={errors}
                minRows={2}
                labelPlacement={labelPlacement}
              />
            );
          case 'hidden':
            return (
              <input
                key={field.key}
                type="hidden"
                name={field.key}
                value={control._defaultValues[field.key]}
              />
            );
          case 'date':
            return (
              <DatePicker key={field.key} name={field.key} control={control} errors={errors} />
            );
          case 'radio':
            if (!field.enum) {
              console.error('Enum not provided for field:', field.key);
              return null;
            }
            return (
              <RadioGroupControlled
                key={field.key}
                isDisabled={false}
                onChange={undefined}
                color={'primary'}
                size={'md'}
                disableAnimation={false}
                control={control}
                name={field.key}
                label={field.label}
                errors={errors}
              >
                {Object.entries(field.enum).map(([key, value]) => (
                  <Radio key={key} value={value as string}>
                    {value}
                  </Radio>
                ))}
              </RadioGroupControlled>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default FormFields;
