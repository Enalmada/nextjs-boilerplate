// Currently unused but here for reference to do more powerful validation in future
// https://www.carlrippon.com/react-hook-form-server-validation/
export function addServerErrors<T>(
  errors: { [P in keyof T]?: string[] },
  setError: (fieldName: keyof T, error: { type: string; message: string }) => void
) {
  return Object.keys(errors).forEach((key) => {
    setError(key as keyof T, {
      type: 'server',
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      message: errors[key as keyof T]!.join('. '),
    });
  });
}
