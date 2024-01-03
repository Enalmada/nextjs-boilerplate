interface FormErrorProps {
  errors: string[];
}

const FormError = ({ errors }: FormErrorProps) => {
  if (!errors || errors.length === 0) {
    return null; // Render nothing if there are no errors
  }

  return (
    <div className="pb-5">
      <div className="alert mb-5 flex flex-row items-center rounded border-b-2 border-red-300 bg-red-200 p-5">
        <div className="alert-icon flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-red-500 bg-red-100">
          <span className="text-red-500">
            <svg fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </div>
        <div className="alert-content ml-4">
          <div className="alert-title text-lg font-semibold text-red-800">Error</div>
          <div className="alert-description text-sm text-red-600">
            <ul>
              {errors.map((errorMessage, index) => (
                <li key={index}>{errorMessage}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormError;
