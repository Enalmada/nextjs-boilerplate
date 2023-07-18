import { type ApolloError } from '@apollo/client';

type ErrorType = {
  message: string;
};

export const extractErrorMessages = (error?: ApolloError): string[] => {
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
