import React from 'react';
import { Button, InputControlled, Link } from '@/client/ui';
import { HiddenIcon } from '@/client/ui/icons/HiddenIcon';
import { VisibleIcon } from '@/client/ui/icons/VisibleIcon';
import { useFirebaseAuth } from '@/lib/firebase/auth/firebase';
import { FirebaseError } from '@firebase/util';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@nextui-org/react';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

type SetLoggedFunction = React.Dispatch<React.SetStateAction<boolean>>;

interface Props {
  isSignIn: boolean;
  setHasLogged: SetLoggedFunction;
  redirect?: string;
}

export default function PasswordForm({ redirect, isSignIn, setHasLogged }: Props) {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  type FormData = {
    email: string;
    password: string;
  };

  const { getFirebaseAuth } = useFirebaseAuth();

  const schema = z.object({
    email: z.string().min(1, 'valid email is required'),
    password: z.string().min(1, 'valid password is required'),
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
      password: '', // necessary for SSR to maintain controlled component
    },
  });

  const onSubmit = async ({ email, password }: FormData) => {
    const auth = getFirebaseAuth();
    try {
      const credential = isSignIn
        ? await signInWithEmailAndPassword(auth, email, password)
        : await createUserWithEmailAndPassword(auth, email, password);
      if (!isSignIn) {
        await sendEmailVerification(credential.user);
      }
      const idTokenResult = await credential.user.getIdTokenResult();
      setHasLogged(true);
      await fetch('/api/login', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${idTokenResult.token}`,
        },
      });
      // router.refresh(); // This seems necessary to avoid a full window.reload
      // TODO get router refresh and push working again.
      // router.push(redirect ?? '/');
      window.location.replace(redirect ?? '/app');
    } catch (error: unknown) {
      setHasLogged(false);

      if (error instanceof FirebaseError && error.code === 'auth/wrong-password') {
        setError('root', {
          type: 'auth/wrong-password',
          message: 'The email/password combination not found',
        });
        return;
      }

      if (error instanceof FirebaseError && error.code === 'auth/user-not-found') {
        setError('root', {
          type: 'auth/user-not-found',
          message: 'The email/password combination not found',
        });
        return;
      }

      if (error instanceof FirebaseError && error.code === 'auth/email-already-in-use') {
        setError('root', {
          type: 'auth/email-already-in-use',
          message: 'The email already exists',
        });
        return;
      }

      setError('root', {
        type: 'unknown',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        message: error.message || 'Unknown error',
      });
    }
  };

  return (
    <>
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
          <InputControlled
            name="email"
            control={control}
            placeholder={' '}
            errors={errors}
            isRequired
            type="email"
            labelPlacement={'outside'}
            label={'Email address'}
            isDisabled={isSubmitting || isSubmitSuccessful}
            classNames={{
              label: "after:content-['']",
            }}
          />

          <InputControlled
            name="password"
            control={control}
            errors={errors}
            isRequired
            placeholder={' '}
            label={'Password'}
            labelPlacement={'outside'}
            isDisabled={isSubmitting || isSubmitSuccessful}
            classNames={{
              label: "after:content-['']",
            }}
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? <VisibleIcon /> : <HiddenIcon />}
              </button>
            }
            type={isVisible ? 'text' : 'password'}
          />
          {isSignIn && (
            <div className={'mb-5 flex justify-end'}>
              <Link size="sm" href={`/reset-password` + (redirect ? `?redirect=${redirect}` : '')}>
                Forgot password?
              </Link>
            </div>
          )}

          {!isSignIn && (
            <Checkbox isRequired={true} size="sm">
              You agree and have read the{' '}
              <Link size="sm" href="/terms" isExternal={true}>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link size="sm" href="/privacy" isExternal={true}>
                Privacy Policy
              </Link>
            </Checkbox>
          )}

          <Button type="submit" isLoading={isSubmitting} isDisabled={isSubmitSuccessful}>
            Sign in
          </Button>
        </div>
      </form>
    </>
  );
}
