import '@/client/styles/index.css';

import { notFound } from 'next/navigation';
import { UrqlWrapper } from '@/client/gql/UrqlWrapper';
import { fontSans } from '@/client/styles/fonts';
import { NextUIWrapper } from '@/client/ui/NextUIWrapper';
import { ServerAuthProvider } from '@/lib/firebase/auth/server-auth-provider';
import metadataConfig from '@/metadata.config';
import clsx from 'clsx';
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';

type Props = {
  children: React.ReactNode;
  params?: {
    locale?: string;
  };
};

export const metadata = {
  ...metadataConfig,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default async function LocaleLayout({ children, params = { locale: 'en' } }: Props) {
  const { locale = 'en' } = params;

  let messages: AbstractIntlMessages;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    messages = (await import(`../../../messages/${locale}.json`)).default as AbstractIntlMessages;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body
        className={clsx(
          'min-h-screen bg-background bg-slate-50 font-sans antialiased dark:bg-slate-900',
          fontSans.variable
        )}
      >
        {/* <AxiomWebVitals /> */}
        <ServerAuthProvider>
          <UrqlWrapper>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <NextUIWrapper themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
                {children}
              </NextUIWrapper>
            </NextIntlClientProvider>
          </UrqlWrapper>
        </ServerAuthProvider>
      </body>
    </html>
  );
}
