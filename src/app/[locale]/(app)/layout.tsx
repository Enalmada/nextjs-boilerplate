import AppLayout from '@/app/[locale]/(app)/AppLayout';
import { ApolloWrapper } from '@/client/gql/apollo-wrapper';
import { ServerAuthProvider } from '@/lib/firebase/auth/server-auth-provider';

// Editor may say this error but tsc doesn't
// TS71003: "process.env.NEXT_RUNTIME_EDGE ? 'edge' : 'nodejs'" is not a valid value for the "runtime" option. The configuration must be statically analyzable.
// This may not be imported from another file
// export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ServerAuthProvider>
      <ApolloWrapper>
        <AppLayout>{children}</AppLayout>
      </ApolloWrapper>
    </ServerAuthProvider>
  );
}
