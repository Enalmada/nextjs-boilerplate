import Link from 'next/link';

export const metadata = {
  title: 'Not Found',
};
export default function Page() {
  return (
    <div className="m-auto flex min-h-screen w-9/12 items-center justify-center py-16">
      <div className="overflow-hidden bg-white pb-8 shadow sm:rounded-lg">
        <div className="border-t border-gray-200 pt-8 text-center">
          <h1 className="py-8 text-4xl font-medium text-black">oops! Page not found</h1>
          <p className="px-12 pb-8 text-2xl font-medium text-black">
            It might have been moved or deleted.
          </p>
          <Link href={'/'}>
            <button className="mr-6 rounded-md bg-gradient-to-r from-purple-400 to-blue-500 px-6 py-3 font-semibold text-white hover:from-pink-500 hover:to-orange-500">
              HOME
            </button>
          </Link>
          <Link href={'/'}>
            <button className="rounded-md bg-gradient-to-r from-red-400 to-red-500 px-6 py-3 font-semibold text-white hover:from-red-500 hover:to-red-500">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
