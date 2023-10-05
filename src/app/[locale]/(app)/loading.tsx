import { Card, CardBody, Spinner } from '@/client/ui';

export default function AppLoading() {
  return (
    <div className="h-full text-black dark:text-white">
      <div className="flex h-full items-center bg-gray-100 py-16 dark:bg-slate-900">
        <main className="mx-auto w-full max-w-md p-6">
          <Card radius="sm" shadow="sm">
            <CardBody>
              <div className="content-center justify-center text-center">
                <div className={'mb-5'}>Loading</div>
                <Spinner />
              </div>
            </CardBody>
          </Card>
        </main>
      </div>
    </div>
  );
}
