import AppLayout from '@/app/[locale]/(app)/AppLayout';

// Uncomment for Cloudflare next-on-pages (required) or Vercel edge
// export const runtime = 'edge';

// TODO - confirm we really need to 'force-dynamic' here
export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
