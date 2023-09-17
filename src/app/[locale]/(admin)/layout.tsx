'use client';

import AdminLayout from '@/app/[locale]/(admin)/AdminLayout';
import Authorization from '@/app/[locale]/(admin)/Authorization';
import { type MeQuery } from '@/client/gql/generated/graphql';
import { ME } from '@/client/gql/queries-mutations';
import { useSuspenseQuery } from '@apollo/client';

// Editor may say this error but tsc doesn't
// TS71003: "process.env.NEXT_RUNTIME_EDGE ? 'edge' : 'nodejs'" is not a valid value for the "runtime" option. The configuration must be statically analyzable.
// This may not be imported from another file
// export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { data: dataQuery, error: errorQuery } = useSuspenseQuery<MeQuery>(ME);

  if (errorQuery) return <div>{`Error! ${errorQuery.message}`}</div>;

  return (
    <>
      {' '}
      <Authorization me={dataQuery.me} />
      <AdminLayout me={dataQuery.me}>{children}</AdminLayout>
    </>
  );
}
