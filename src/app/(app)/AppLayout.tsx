import Header from '@/client/components/layout/app/Header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-screen flex-col text-white">
      <Header />
      <main className="container mx-auto max-w-7xl flex-grow px-6 pt-10">{children}</main>
      {/*
      <footer className="flex w-full items-center justify-center py-3">
        <Link className="flex items-center gap-1 text-current" href="/" title="Homepage">
          <span className="text-default-600">Site</span>
          <p className="text-primary">2023</p>
        </Link>
      </footer>
      */}
    </div>
  );
}
