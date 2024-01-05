/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Button as NextUIButton, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import {
  Controller,
  type Control,
  type DeepRequired,
  type FieldErrorsImpl,
  type FieldValues,
  type Path,
} from 'react-hook-form';

interface DatePickerProps<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  errors: FieldErrorsImpl<DeepRequired<T>>;
}

const DatePicker = <T extends FieldValues>({ control, name, errors }: DatePickerProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-row items-center gap-2">
      <Controller
        name={name as Path<T>}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <Popover
              isOpen={isOpen}
              onOpenChange={setIsOpen}
              placement="bottom"
              showArrow={true}
              onClose={() => setIsOpen(false)}
            >
              <PopoverTrigger>
                <NextUIButton color="default" radius={'sm'} className={'mb-5 mr-3'}>
                  Due Date:&nbsp;
                  {value ? format(new Date(value), 'PP') : 'none'}
                </NextUIButton>
              </PopoverTrigger>
              <PopoverContent>
                <DayPicker
                  mode="single"
                  selected={value ? new Date(value) : undefined}
                  onSelect={(date, _selectedDay, _activeModifiers, e) => {
                    onChange(date || null);
                    (e.currentTarget as HTMLElement).blur(); // Close popover
                  }}
                />
              </PopoverContent>
            </Popover>
            {errors[name] && errors[name]?.message && <div>{JSON.stringify(control)}</div>}
            {value && (
              <NextUIButton
                variant="ghost"
                color="danger"
                className={'mb-5'}
                radius={'sm'}
                onPress={() => onChange(null)}
              >
                Clear
              </NextUIButton>
            )}
          </>
        )}
      />
    </div>
  );
};

export default DatePicker;
