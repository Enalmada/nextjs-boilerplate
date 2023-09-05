import { notFound } from 'next/navigation';
import { MarketingLayout } from '@/app/[locale]/(marketing)/MarketingLayout';
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';

// Using the searchParams Pages prop will opt the page into dynamic rendering at request time.
// https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#dynamic-functions
export const dynamic = 'force-static';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'ru' }];
}

type Props = {
  children: React.ReactNode;
  params?: {
    locale?: string;
  };
};

export default async function RootLayout({ children, params = { locale: 'en' } }: Props) {
  const { locale = 'en' } = params;

  let messages: AbstractIntlMessages;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    messages = (await import(`../../../../messages/${locale}.json`))
      .default as AbstractIntlMessages;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MarketingLayout>{children}</MarketingLayout>
    </NextIntlClientProvider>
  );
}
