import { Card, CardBody } from '@/client/ui/Card';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full text-black dark:text-white">
      <div className="flex h-full items-center bg-gray-100 py-16 dark:bg-slate-900">
        <main className="mx-auto w-full max-w-md p-6">
          <Card radius="sm" shadow="sm">
            <CardBody>{children}</CardBody>
          </Card>
        </main>
      </div>
    </div>
  );
}
