import React from 'react';
import FileUpload from '@/app/[locale]/(admin)/admin/developers/FileUpload';
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
      </CardBody>
    </Card>
  );
}
