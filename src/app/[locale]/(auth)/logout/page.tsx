import Redirecting from '@/client/components/auth/Redirecting';

import LogoutPage from './LogoutPage';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Logout',
};

export default function Logout() {
  return (
    <>
      <Redirecting>Logging out</Redirecting>
      <LogoutPage />
    </>
  );
}
