import Header from '@/client/components/layout/app/Header';
import { ApolloWrapper } from '@/client/gql/apollo-wrapper';
import { ServerAuthProvider } from '@/lib/firebase/auth/server-auth-provider';

export const dynamic = 'force-dynamic';
// export const runtime = 'edge';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-screen flex-col text-white">
      <Header />
      <main className="container mx-auto max-w-7xl flex-grow px-6 pt-10">{children}</main>
      {/*
      <footer className="flex w-full items-center justify-center py-3">
        <Link className="flex items-center gap-1 text-current" href="/" title="Homepage">
          <span className="text-default-600">Site</span>
          <p className="text-primary">2023</p>
        </Link>
      </footer>
      */}
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ServerAuthProvider>
      <ApolloWrapper>
        <AppLayout>{children}</AppLayout>
      </ApolloWrapper>
    </ServerAuthProvider>
  );
}