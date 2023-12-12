import React from 'react';
import UserForm from '@/app/[locale]/(admin)/admin/users/[id]/UserForm';
import { Breadcrumb } from '@/client/ui';
import { getRouteById } from '@/client/utils/routes';

interface Props {
  params: {
    id: string;
  };
}
export const metadata = {
  title: 'User',
};

export default function Page(props: Props) {
  const id = props.params.id;
  return (
    <div className="mx-auto my-5 flex w-full max-w-[95rem] flex-col gap-4">
      <Breadcrumb
        routes={[getRouteById('AdminHome'), getRouteById('AdminUsers'), getRouteById('AdminUser')]}
      />

      <UserForm id={id} />
    </div>
  );
}
