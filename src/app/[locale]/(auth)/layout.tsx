import AuthLayout from '@/app/[locale]/(auth)/AuthLayout';

// Editor may say this error but tsc doesn't
// TS71003: "process.env.NEXT_RUNTIME_EDGE ? 'edge' : 'nodejs'" is not a valid value for the "runtime" option. The configuration must be statically analyzable.
// This may not be imported from another file
export const runtime = 'edge';

// Using the searchParams Pages prop will opt the page into dynamic rendering at request time.
// https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#dynamic-functions

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'ru' }];
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
