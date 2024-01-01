'use client';

import { useRouter } from 'next/navigation';
import { ADMIN_UPDATE_USER, ADMIN_USER } from '@/client/gql/admin-queries.gql';
import { extractErrorMessages } from '@/client/gql/errorHandling';
import { Button, Card, CardBody, Radio, RadioGroupControlled } from '@/client/ui';
import { useMutation, useQuery } from '@enalmada/next-gql/client';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm } from 'react-hook-form';
import { object, string } from 'valibot';

import 'react-day-picker/dist/style.css';

import CancelButton from '@/client/components/admin/buttons/CancelButton';
import ReadOnlyInput from '@/client/components/admin/ReadOnlyInput';
import {
  UserRole,
  type AdminUpdateUserMutation,
  type AdminUpdateUserMutationVariables,
  type AdminUserQuery,
  type MutationUpdateUserInput,
  type User,
} from '@/client/gql/generated/graphql';

interface Props {
  id?: string;
}

export default function UserForm(props: Props) {
  const router = useRouter();

  const [{ data: queryData, error: queryError }] = useQuery<AdminUserQuery>({
    query: ADMIN_USER,
    variables: { id: props.id || '' },
    pause: props.id === undefined,
  });

  // Create and Update loading is handled by form submitting
  // mutation error will render errors but not handle them
  // https://stackoverflow.com/questions/59465864/handling-errors-with-react-apollo-usemutation-hook
  const [{ error: updateError }, updateUser] = useMutation<
    AdminUpdateUserMutation,
    AdminUpdateUserMutationVariables
  >(ADMIN_UPDATE_USER);

  const schema = object({
    role: string(),
  });

  const { id, email } = (queryData?.user as User) || ({} as User);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
  } = useForm<MutationUpdateUserInput>({
    resolver: valibotResolver(schema),
    defaultValues: {
      ...queryData?.user,
    },
  });

  const onSubmit = async (formData: MutationUpdateUserInput) => {
    const result = await updateUser({
      id: props.id!,
      input: {
        ...formData,
        version: queryData!.user!.version,
      },
    });

    if (result.data) {
      router.push('/admin/users');
    }
  };

  // Without this, updating description causes form update schema checking to say "title can't be blank"
  if (queryError) return <div>{`Error! ${queryError.message}`}</div>;

  const formError = (errors: string[]) => {
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

  return (
    <Card radius="sm" shadow="sm" className="max-w-sm sm:max-w-md md:max-w-lg">
      <CardBody>
        <div>
          {updateError && formError(extractErrorMessages(updateError))}

          <ReadOnlyInput label="ID" defaultValue={id} />

          <ReadOnlyInput label="Email" defaultValue={email || ''} />

          <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
            <RadioGroupControlled
              isDisabled={false}
              onChange={undefined}
              color={'primary'}
              size={'md'}
              disableAnimation={false}
              control={control}
              name="role"
              label="Role"
              orientation="horizontal"
              errors={errors}
            >
              {Object.entries(UserRole).map(([key, value]) => (
                <Radio key={key} value={value}>
                  {value}
                </Radio>
              ))}
            </RadioGroupControlled>

            <div className={'mt-10 flex justify-between'}>
              <div className={'flex justify-center'}>
                <Button color={'primary'} type="submit" isLoading={isSubmitting} className={'mr-5'}>
                  {id ? 'Save' : 'Create'}
                </Button>

                <CancelButton href={'/admin/users'} isDisabled={isSubmitting} />
              </div>
            </div>
          </form>
        </div>
      </CardBody>
    </Card>
  );
}
