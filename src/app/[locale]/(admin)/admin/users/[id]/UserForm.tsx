'use client';

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { extractErrorMessages } from '@/client/gql/errorHandling';
import { UPDATE_USER, USER } from '@/client/gql/queries-mutations';
import { Button, Card, CardBody, Radio, RadioGroupControlled } from '@/client/ui';
import { useMutation, useQuery } from '@enalmada/next-gql/client';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm } from 'react-hook-form';
import { object, string } from 'valibot';

import 'react-day-picker/dist/style.css';

import ReadOnlyInput from '@/client/components/admin/ReadOnlyInput';
import {
  UserRole,
  type UpdateUserMutation,
  type UpdateUserMutationVariables,
  type User,
  type UserQuery,
} from '@/client/gql/generated/graphql';

interface Props {
  id?: string;
}

export default function UserForm(props: Props) {
  const router = useRouter();

  const [{ data: dataQuery, error: errorQuery }] = useQuery<UserQuery>({
    query: USER,
    variables: { id: props.id || '' },
    pause: props.id === undefined,
  });

  // Create and Update loading is handled by form submitting
  // mutation error will render errors but not handle them
  // https://stackoverflow.com/questions/59465864/handling-errors-with-react-apollo-usemutation-hook
  const [{ error: updateMutationError }, updateUser] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UPDATE_USER);

  // TODO: dueDate should be Date (form not submitting)
  type FormData = {
    role: string;
  };

  const schema = object({
    role: string(),
  });

  const { id, email, role, version } = (dataQuery?.user as User) || ({} as User);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
  } = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      role: role || UserRole.Member,
    },
  });

  const onSubmit = async ({ role }: FormData) => {
    const input = {
      role: role == 'MEMBER' ? UserRole.Member : UserRole.Admin,
    };

    const result = await updateUser({
      id,
      input: {
        ...input,
        version,
      },
    });

    if (result.data) {
      router.push('/admin/users');
    }
  };

  // Without this, updating description causes form update schema checking to say "title can't be blank"
  if (errorQuery) return <div>{`Error! ${errorQuery.message}`}</div>;

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
          {updateMutationError && formError(extractErrorMessages(updateMutationError))}

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
              <Radio value={UserRole.Member}>Member</Radio>
              <Radio value={UserRole.Admin}>Admin</Radio>
            </RadioGroupControlled>

            <div className={'mt-10 flex justify-between'}>
              <div className={'flex justify-center'}>
                <Button color={'primary'} type="submit" isLoading={isSubmitting} className={'mr-5'}>
                  {id ? 'Save' : 'Create'}
                </Button>

                <Button
                  as={NextLink}
                  href={'/admin/users'}
                  color={'default'}
                  isDisabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </CardBody>
    </Card>
  );
}
