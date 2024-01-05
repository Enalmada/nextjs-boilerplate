'use client';

import EditCard from '@/client/admin/edit/EditCard';
import FormFields, {
  generateFormSchema,
  type FormFieldConfig,
} from '@/client/admin/edit/formGeneration';
import { useAdminEdit } from '@/client/admin/edit/useAdminEdit';
import ReadOnlyInput from '@/client/components/admin/ReadOnlyInput';
import { ADMIN_DELETE_USER, ADMIN_UPDATE_USER, ADMIN_USER } from '@/client/gql/admin-queries.gql';
import {
  UserRole,
  type AdminDeleteUserMutation,
  type AdminDeleteUserMutationVariables,
  type AdminUpdateUserMutation,
  type AdminUpdateUserMutationVariables,
  type AdminUserQuery,
  type AdminUserQueryVariables,
  type MutationUpdateUserInput,
  type User,
} from '@/client/gql/generated/graphql';
import { enum_, number } from 'valibot';

interface Props {
  id?: string;
}

export default function UserForm(props: Props) {
  const inputConfig: FormFieldConfig[] = [
    {
      key: 'role',
      label: 'Role',
      component: 'radio',
      validation: enum_(UserRole),
      enum: UserRole,
    },
    {
      key: 'version',
      component: 'hidden',
      validation: number(),
    },
  ];

  const {
    queryResult: { data: queryData, error: queryError },
    updateMutation: [{ error: updateError }],
    deleteMutation: [{ error: deleteError, fetching: deleteFetching }],
    form: {
      formState: { errors, isSubmitting },
      handleSubmit,
      control,
      onSubmit,
    },
    handleDelete,
  } = useAdminEdit<
    AdminUserQuery,
    AdminUserQueryVariables,
    AdminUpdateUserMutation,
    AdminUpdateUserMutationVariables,
    MutationUpdateUserInput,
    AdminDeleteUserMutation,
    AdminDeleteUserMutationVariables
  >(props.id, 'user', ADMIN_USER, ADMIN_UPDATE_USER, ADMIN_DELETE_USER, {
    formSchema: generateFormSchema(inputConfig),
    reUrl: '/admin/users',
  });

  const { id, email } = (queryData?.user as User) || ({} as User);

  // Without this, updating description causes form update schema checking to say "title can't be blank"
  if (queryError) return <div>{`Error! ${queryError.message}`}</div>;

  return (
    <EditCard
      save={!!props.id}
      errors={[updateError, deleteError]}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      reUrl={'/admin/users'}
      handleDelete={handleDelete}
      deleteFetching={deleteFetching}
    >
      <ReadOnlyInput label="ID" defaultValue={id} />

      <ReadOnlyInput label="Email" defaultValue={email || ''} />

      <FormFields control={control} errors={errors} config={inputConfig} />
    </EditCard>
  );
}
