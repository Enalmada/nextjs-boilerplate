import Loader from '@/client/components/Loader';

import LogoutPage from './LogoutPage';

export const metadata = {
  title: 'Logout',
};

export default function Logout() {
  return (
    <>
      <Loader />
      <LogoutPage />
    </>
  );
}
