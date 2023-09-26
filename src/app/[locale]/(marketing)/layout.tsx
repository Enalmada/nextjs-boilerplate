import { MarketingLayout } from '@/app/[locale]/(marketing)/MarketingLayout';

// Editor may say this error but tsc doesn't
// TS71003: "process.env.NEXT_RUNTIME_EDGE ? 'edge' : 'nodejs'" is not a valid value for the "runtime" option. The configuration must be statically analyzable.
// This may not be imported from another file
export const runtime = 'edge';

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

export default function RootLayout({ children }: Props) {
  return <MarketingLayout>{children}</MarketingLayout>;
}
