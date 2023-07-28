import Footer from '@/client/components/layout/Footer';
import Header from '@/client/components/layout/Header';

// Using the searchParams Pages prop will opt the page into dynamic rendering at request time.
// https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#dynamic-functions
export const dynamic = 'force-static';

function MarketingLayout({ children }: { children: React.ReactNode }) {
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <MarketingLayout>{children}</MarketingLayout>;
}
