import React from 'react';
import FileUpload from '@/app/[locale]/(admin)/admin/developers/FileUpload';
import PublishNotification from '@/app/[locale]/(admin)/admin/developers/PublishNotification';
import Subscription from '@/app/[locale]/(admin)/admin/developers/Subscription';
import { Card, CardBody, CardHeader } from '@nextui-org/react';

export const metadata = {
  title: 'Admin',
};

export default function Page() {
  return (
    <Card>
      <CardHeader className="flex gap-3">
        <h1 className="text-xl font-semibold">Tech</h1>
      </CardHeader>
      <CardBody>
        <FileUpload />
        <PublishNotification />
        <Subscription />
      </CardBody>
    </Card>
  );
}
