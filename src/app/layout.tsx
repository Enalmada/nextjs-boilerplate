import '@/client/styles/index.css';

import { fontSans } from '@/client/styles/fonts';
import { NextUIWrapper } from '@/client/ui/NextUIWrapper';
import metadataConfig from '@/metadata.config';
import clsx from 'clsx';

export const metadata = {
  ...metadataConfig,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={clsx(
          'min-h-screen bg-background bg-slate-50 font-sans antialiased dark:bg-slate-900',
          fontSans.variable
        )}
      >
        <NextUIWrapper themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          {children}
        </NextUIWrapper>
      </body>
    </html>
  );
}
