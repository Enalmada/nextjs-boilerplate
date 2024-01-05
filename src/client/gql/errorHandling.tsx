// TODO update with better types
// https://formidable.com/open-source/urql/docs/basics/errors/

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export const extractErrorMessages = (...errors: unknown[]): string[] => {
  return errors.reduce<string[]>((acc, error) => {
    // Check if error is an object and has a 'message' property of type string
    if (typeof error === 'object' && error !== null && 'message' in error) {
      const errorMessage = (error as { message: unknown }).message;
      if (typeof errorMessage === 'string') {
        acc.push(errorMessage);
      }
    }
    return acc;
  }, []);
};

// Older apollo client stuff for reference
/*
type ErrorType = {
  message: string;
};

export const extractErrorMessages = (error?: unknown): string[] => {
  if (!error) {
    return [];
  }

  const errorMessages: string[] = [];

  // Handle graphQLErrors
  if (error.graphQLErrors) {
    error.graphQLErrors.forEach((graphQLError) => {
      errorMessages.push(graphQLError.message);
    });
  }

  // Handle networkError
  const networkError = error.networkError;
  if (networkError && 'result' in networkError) {
    if (typeof networkError.result === 'string') {
      errorMessages.push(networkError.result);
    } else if (typeof networkError.result === 'object' && 'errors' in networkError.result) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const resultErrors = networkError.result.errors;
      if (Array.isArray(resultErrors)) {
        resultErrors.forEach((resultError) => {
          const error = resultError as ErrorType;
          errorMessages.push(error.message);
        });
      }
    }
  }

  return errorMessages;
};
*/
