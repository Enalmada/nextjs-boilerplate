import AdminLayout from '@/app/[locale]/(admin)/AdminLayout';

// Uncomment for Cloudflare next-on-pages (required) or Vercel edge
// export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
