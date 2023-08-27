'use client';

import { Button, InputControlled, Link } from '@/client/ui';
import { useFirebaseAuth } from '@/lib/firebase/auth/firebase';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface Props {
  redirect?: string;
}

export const Successful = ({ redirect }: Props) => {
  return (
    <>
      <div
        className="rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-600"
        role="alert"
      >
        <span className="font-bold">Success!</span> Please check your email for further
        instructions.
      </div>

      <div className="text-center">
        <Link
          size="sm"
          className="ml-2 mt-5"
          href={`/login` + (redirect ? `?redirect=${redirect}` : '')}
        >
          Return to login
        </Link>
      </div>
    </>
  );
};

export function ResetPasswordPage({ redirect }: Props) {
  // const params = useSearchParams();
  // TODO make sure forgot password page links back to login with redirect
  // const redirect = params?.get('redirect');

  const { getFirebaseAuth } = useFirebaseAuth();

  type FormData = {
    email: string;
  };

  const schema = z.object({
    email: z.string().min(1, 'valid email is required'),
  });

  const {
    formState: { errors, isSubmitting, isSubmitSuccessful },
    handleSubmit,
    control,
    setError,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '', // necessary for SSR to maintain controlled component
    },
  });

  const onSubmit = async ({ email }: FormData) => {
    try {
      const auth = getFirebaseAuth();
      await sendPasswordResetEmail(auth, email);
    } catch (error: unknown) {
      setError('root', {
        type: 'unknown',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        message: (error.message as string) || 'Unknown error',
      });
    }
  };

  return (
    <>
      {isSubmitSuccessful && <Successful redirect={redirect} />}
      {!isSubmitSuccessful && (
        <>
          <div className="text-center">
            <h1 className="block text-xl font-bold text-gray-800 dark:text-white">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Remember your password?
              <Link
                size="sm"
                className="ml-2"
                href={`/login` + (redirect ? `?redirect=${redirect}` : '')}
              >
                Sign in here
              </Link>
            </p>
          </div>

          {errors.root && (
            <div
              className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600"
              role="alert"
            >
              <span className="font-bold">Error</span> {errors.root.message}
            </div>
          )}

          <form onSubmit={(event) => void handleSubmit(onSubmit)(event)} className="mt-5">
            <div className="grid gap-y-4">
              <div>
                <div className="relative">
                  <InputControlled
                    name="email"
                    control={control}
                    placeholder={'email'}
                    errors={errors}
                    isRequired
                    type="email"
                    isDisabled={isSubmitting || isSubmitSuccessful}
                  />

                  <div
                    className={`${
                      !errors.email ? 'hidden' : ''
                    } pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3`}
                  >
                    <svg
                      className="h-5 w-5 text-red-500"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <Button isLoading={isSubmitting} isDisabled={isSubmitSuccessful} type="submit">
                Reset password
              </Button>
            </div>
          </form>
        </>
      )}
    </>
  );
}
