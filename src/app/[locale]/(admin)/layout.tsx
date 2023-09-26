'use client';

import AdminLayout from '@/app/[locale]/(admin)/AdminLayout';
import { useAuthorization } from '@/app/[locale]/(admin)/Authorization';
import { type MeQuery } from '@/client/gql/generated/graphql';
import { ME } from '@/client/gql/queries-mutations';
import { useSuspenseQuery } from '@apollo/client';

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { data: dataQuery, error: errorQuery } = useSuspenseQuery<MeQuery>(ME);

  useAuthorization(dataQuery?.me);

  if (errorQuery) return <div>{`Error! ${errorQuery.message}`}</div>;

  return <AdminLayout me={dataQuery.me}>{children}</AdminLayout>;
}
