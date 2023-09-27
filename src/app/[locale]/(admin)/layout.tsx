'use client';

import AdminLayout from '@/app/[locale]/(admin)/AdminLayout';
import { useAuthorization } from '@/app/[locale]/(admin)/Authorization';
import { type MeQuery } from '@/client/gql/generated/graphql';
import { ME } from '@/client/gql/queries-mutations';
import { useQuery } from '@urql/next';

// Uncomment for Cloudflare next-on-pages (required) or Vercel edge
// export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [{ data: dataQuery, error: errorQuery }] = useQuery<MeQuery>({ query: ME });

  useAuthorization(dataQuery?.me);

  if (errorQuery) return <div>{`Error! ${errorQuery.message}`}</div>;

  return <AdminLayout me={dataQuery?.me}>{children}</AdminLayout>;
}
