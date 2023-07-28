import { type ReactNode } from 'react';
import { Spinner } from '@/client/ui/Spinner';

interface Props {
  children: ReactNode;
}
export default function Redirecting({ children }: Props) {
  return (
    <div className="content-center justify-center text-center">
      <div className={'mb-5'}>{children}</div>
      <Spinner />
    </div>
  );
}
