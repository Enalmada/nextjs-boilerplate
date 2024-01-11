/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputControlled, Radio, RadioGroupControlled, TextareaControlled } from '@/client/ui';
import DatePicker from '@/client/ui/DateInput';
import { capitalCase } from 'change-case';
import {
  type Control,
  type DeepRequired,
  type FieldErrorsImpl,
  type FieldValues,
} from 'react-hook-form';
import { nullish, object, required, string, type BaseSchema } from 'valibot';

export interface FormFieldConfig {
  key: string;
  label?: string;
  component?: 'input' | 'textarea' | 'radio' | 'date' | 'hidden' | 'radiobool';
  validation?: BaseSchema | null;
  enum?: Record<string, any>;
  defaultValue?: string;
  isReadOnly?: boolean;
  isDisabled?: boolean;
}

export const generateFormSchema = (config: FormFieldConfig[]) => {
  const schemaFields = config.reduce<Record<string, BaseSchema>>((acc, field) => {
    if (field.validation || field.validation === undefined) {
      acc[field.key] = field.validation === undefined ? nullish(string()) : field.validation;
    }
    return acc;
  }, {});

  return required(object(schemaFields));
};

interface FormFieldProps<T extends FieldValues> {
  config: FormFieldConfig[];
  control: Control<T>;
  errors: Partial<FieldErrorsImpl<DeepRequired<T>>>;
  horizontal?: boolean;
}

const mapValueToRadio = (value: boolean | null): string => {
  if (value === true) return 'true';
  if (value === false) return 'false';
  return 'unknown';
};

const mapRadioToValue = (radioValue: string): boolean | null => {
  if (radioValue === 'true') return true;
  if (radioValue === 'false') return false;
  return null;
};

const FormFields = <T extends FieldValues>({
  config,
  control,
  errors,
  horizontal,
}: FormFieldProps<T>) => {
  const labelPlacement = 'inside';
  const containerClass = horizontal
    ? 'grid grid-flow-col auto-cols-max gap-4'
    : 'grid grid-flow-row gap-4';

  return (
    <div className={containerClass}>
      {config.map((field) => {
        const label = field.label === undefined ? capitalCase(field.key) : field.label;

        switch (field.component || 'input') {
          case 'radiobool':
            return (
              <RadioGroupControlled
                key={field.key}
                mapValueToRadio={mapValueToRadio}
                mapRadioToValue={mapRadioToValue}
                isDisabled={false}
                color={'primary'}
                size={'md'}
                disableAnimation={false}
                control={control}
                name={field.key}
                label={label}
                errors={errors}
                orientation="horizontal"
              >
                <Radio key={'true'} value={'true'}>
                  Yes
                </Radio>
                <Radio key={'false'} value={'false'}>
                  No
                </Radio>
                <Radio key={'unknown'} value={'unknown'}>
                  Unknown
                </Radio>
              </RadioGroupControlled>
            );
          case 'input':
            return (
              <InputControlled
                key={field.key}
                name={field.key}
                control={control}
                label={label}
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
                label={label}
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
                label={label}
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
