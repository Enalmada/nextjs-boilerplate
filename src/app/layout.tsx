import '@/client/styles/index.css';

import { ApolloWrapper } from '@/client/gql/apollo-wrapper';
import { fontSans } from '@/client/styles/fonts';
import { NextUIWrapper } from '@/client/ui/NextUIWrapper';
import { ServerAuthProvider } from '@/lib/firebase/auth/server-auth-provider';
import metadataConfig from '@/metadata.config';
import clsx from 'clsx';

export const metadata = {
  ...metadataConfig,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

// https://nextjs.org/docs/app/building-your-application/optimizing/fonts#with-tailwind-css

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <ServerAuthProvider>
          <ApolloWrapper>
            <NextUIWrapper themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
              {children}
            </NextUIWrapper>
          </ApolloWrapper>
        </ServerAuthProvider>
      </body>
    </html>
  );
}
