'use client';

import 'react-datepicker/dist/react-datepicker.css';

import DatePicker from 'react-datepicker';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

/*
    react-datepicker doesn't use deprecated moment and is pretty nice
    out of the box.
 */

interface Props {
  id: string;
  name: string;
  selected: Date | null;
  onChange: (date: Date | null, event: React.ChangeEvent<HTMLInputElement> | undefined) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const MyDatePicker = (props: Props) => {
  return (
    <DatePicker
      id={props.id}
      name={props.name}
      selected={props.selected}
      onChange={props.onChange}
      onBlur={props.onBlur}
      className={'form-input'}
    />
  );
};
export default MyDatePicker;
