import '@/client/styles/index.css';

import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { fontSans } from '@/client/styles/fonts';
import { NextUIWrapper } from '@/client/ui/NextUIWrapper';
import { ServerAuthProvider } from '@/lib/firebase/auth/server-auth-provider';
import { timeZone } from '@/lib/localization/i18n';
import { locales } from '@/lib/localization/navigation';
import metadataConfig, { viewportConfig } from '@/metadata.config';
import clsx from 'clsx';
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';

type Props = {
  children: React.ReactNode;
  params?: {
    locale?: string;
  };
};

export const viewport = {
  ...viewportConfig,
};

export const metadata = {
  ...metadataConfig,
};

export default async function LocaleLayout({ children, params = { locale: 'en' } }: Props) {
  const { locale = 'en' } = params;
  const nonce = headers().get('x-nonce') || undefined;
  let messages: AbstractIntlMessages;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

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
        <ServerAuthProvider nonce={nonce}>
          <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
            <NextUIWrapper themeProps={{ attribute: 'class', defaultTheme: 'dark', nonce: nonce }}>
              {children}
            </NextUIWrapper>
          </NextIntlClientProvider>
        </ServerAuthProvider>
      </body>
    </html>
  );
}
