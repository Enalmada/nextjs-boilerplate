'use client';

import { useRouter } from 'next/navigation';
import { Button, Card, CardBody } from '@/client/ui';

export default function Page() {
  const router = useRouter();

  return (
    <div className="h-full text-black dark:text-white">
      <div className="flex h-full items-center bg-gray-100 py-16 dark:bg-slate-900">
        <main className="mx-auto w-full max-w-md p-6">
          <Card radius="sm" shadow="sm">
            <CardBody>
              <div className="p-4 text-center text-sm">
                <div className="mb-3 font-bold">Network Unavailable.</div>
                Please retry page when network returns.
              </div>

              <div className="mb-3 mt-3 text-center">
                <Button type="button" onClick={() => router.back()}>
                  Back
                </Button>
              </div>
            </CardBody>
          </Card>
        </main>
      </div>
    </div>
  );
}
