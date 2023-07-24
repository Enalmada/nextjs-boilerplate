import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Spinner } from '@/client/ui/Spinner';

export default function Redirecting() {
  const params = useSearchParams();
  const redirect = params?.get('redirect');

  return (
    <div className="text-center">
      <span className={'mr-3'}>
        Redirecting to <strong>{redirect || '/'}</strong>
      </span>
      <Spinner />
    </div>
  );
}
