import { notFound } from 'next/navigation';
import Footer from '@/client/components/layout/Footer';
import Header from '@/client/components/layout/Header';
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';

// Using the searchParams Pages prop will opt the page into dynamic rendering at request time.
// https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#dynamic-functions
export const dynamic = 'force-static';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'ru' }];
}

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-screen flex-col">
      <Header />
      <div className="flex-grow bg-slate-50 dark:bg-slate-900">
        <main className="container mx-auto max-w-7xl flex-grow px-6 pb-10 pt-10">{children}</main>
      </div>
      <Footer />
    </div>
  );
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
