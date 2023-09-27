import { MarketingLayout } from '@/app/[locale]/(marketing)/MarketingLayout';

// Uncomment for Cloudflare next-on-pages (required) or Vercel edge
// export const runtime = 'edge';

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
