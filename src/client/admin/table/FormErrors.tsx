import { type FieldErrors } from 'react-hook-form';

interface FormErrorProps {
  errors: FieldErrors;
}

const FormErrors = ({ errors }: FormErrorProps) => {
  if (errors.root) {
    return (
      <div
        className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600"
        role="alert"
      >
        <span className="font-bold">Error</span> {errors.root.message}
      </div>
    );
  } else return null;
};

export default FormErrors;
