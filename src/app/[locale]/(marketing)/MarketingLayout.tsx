import Footer from '@/client/components/layout/Footer';
import Header from '@/client/components/layout/Header';

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
