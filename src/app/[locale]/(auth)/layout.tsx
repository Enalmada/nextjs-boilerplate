import AuthLayout from '@/app/[locale]/(auth)/AuthLayout';
import { ServerAuthProvider } from '@/lib/firebase/auth/server-auth-provider';

// Uncomment for Cloudflare next-on-pages (required) or Vercel edge
// export const runtime = 'edge';

// Using the searchParams Pages prop will opt the page into dynamic rendering at request time.
// https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#dynamic-functions

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ServerAuthProvider>
      <AuthLayout>{children}</AuthLayout>
    </ServerAuthProvider>
  );
}
