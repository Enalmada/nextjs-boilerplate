// import AppLayout from '@/client/components/layout/app/AppLayout';
import Header from '@/client/components/layout/app/Header';
import { Link } from '@nextui-org/link';

/*
import { Navbar } from '@/client/components/nextui/navbar';

        <AppLayout>
            {children}
        </AppLayout>

 */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-screen flex-col text-white dark:bg-slate-900">
      {/* <Navbar /> */}
      <Header />
      <main className="container mx-auto max-w-7xl flex-grow px-6 pt-16">{children}</main>
      <footer className="flex w-full items-center justify-center py-3">
        <Link className="flex items-center gap-1 text-current" href="/" title="Homepage">
          <span className="text-default-600">Site</span>
          <p className="text-primary">2023</p>
        </Link>
      </footer>
    </div>
  );
}
