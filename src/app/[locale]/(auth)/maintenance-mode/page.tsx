import NextLink from 'next/link';
import { Button } from '@/client/ui';

export const metadata = {
  title: 'Maintenance',
};

export default function Page() {
  return (
    <div className="px-4 py-10 text-center sm:px-6 lg:px-8">
      <h1 className="block text-7xl font-bold text-gray-800 dark:text-white sm:text-2xl">
        Down For Maintenance
      </h1>
      <h1 className="block text-2xl font-bold text-white"></h1>
      <p className="mt-3 text-gray-600 dark:text-gray-400">Please try again later</p>
      <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
        <Button as={NextLink} href="/" fullWidth className={'mr-5'}>
          Home
        </Button>
        <Button as={NextLink} href="/" color={'default'} fullWidth>
          Contact Us
        </Button>
      </div>
    </div>
  );
}
