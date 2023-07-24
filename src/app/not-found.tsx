import NextLink from 'next/link';
import RootLayout from '@/app/(auth)/layout';
import { Button } from '@/client/ui/Button';

export const metadata = {
  title: 'Not Found',
};
export default function Page() {
  return (
    <RootLayout>
      <div className="px-4 py-10 text-center sm:px-6 lg:px-8">
        <h1 className="block text-7xl font-bold text-gray-800 dark:text-white sm:text-2xl">404</h1>
        <h1 className="block text-2xl font-bold text-white"></h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Sorry, we couldn&apos;t find your page.
        </p>
        <p className="text-gray-600 dark:text-gray-400">It may have been moved or deleted.</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
          <Button as={NextLink} href="/" fullWidth className={'mr-5'}>
            Home
          </Button>
          <Button as={NextLink} href="/" color={'default'} fullWidth>
            Contact Us
          </Button>
        </div>
      </div>
    </RootLayout>
  );
}
