import '@/client/styles/index.css';

import { Inter, Roboto_Mono } from 'next/font/google';
import { ApolloWrapper } from '@/client/lib/apollo-wrapper';
import { ServerAuthProvider } from '@/lib/firebase/auth/server-auth-provider';
import metadataConfig from '@/metadata.config';

export const metadata = {
  ...metadataConfig,
};

// https://nextjs.org/docs/app/building-your-application/optimizing/fonts#with-tailwind-css
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} gradient leading-normal tracking-normal text-white`}>
        <ServerAuthProvider>
          <ApolloWrapper>{children}</ApolloWrapper>
        </ServerAuthProvider>
      </body>
    </html>
  );
}
