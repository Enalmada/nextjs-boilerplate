/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-return */
// inspiration https://github.com/awinogrodzki/react-loading-hook/blob/master/src/useLoadingCallback.ts
// adding unmounting and using react useCallback
import { useCallback, useEffect, useRef, useState } from 'react';

export type IsLoading = boolean;
export type LoadingCallback<T extends (...args: any[]) => Promise<any>> = (
  ...args: Parameters<T>
) => ReturnType<T>;
export type ResetFunc = () => void;

export const useLoadingCallback = <T extends (...args: any[]) => Promise<any>>(
  callback: T
): [LoadingCallback<T>, IsLoading, Error | undefined, ResetFunc] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleCallback = useCallback(
    async (...args: Parameters<T>) => {
      setError(undefined);
      setIsLoading(true);

      try {
        const value = await callback(...args);
        if (isMounted.current) {
          setIsLoading(false);
        }
        return value;
      } catch (e) {
        if (isMounted.current) {
          setError(e instanceof Error ? e : new Error(String(e)));
          setIsLoading(false);
        }
        throw e;
      }
    },
    [callback]
  );

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(undefined);
  }, []);

  return [handleCallback as LoadingCallback<T>, isLoading, error, reset];
};
