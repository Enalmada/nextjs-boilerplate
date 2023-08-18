import AuthLayout from '@/app/(auth)/AuthLayout';
import { ApolloWrapper } from '@/client/gql/apollo-wrapper';

// Using the searchParams Pages prop will opt the page into dynamic rendering at request time.
// https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#dynamic-functions
export const dynamic = 'force-static';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ApolloWrapper>
      <AuthLayout>{children}</AuthLayout>
    </ApolloWrapper>
  );
}
