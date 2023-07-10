import Link from 'next/link';
import { Button } from '@/client/ui/button';

import styles from './page.module.css';
import { UserProfile } from './UserProfile';

export const metadata = {
  title: 'Profile',
};

export default function Profile() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/app">
          <Button>Back to App</Button>
        </Link>
      </nav>
      <h1 className={styles.title}>Profile page</h1>
      <UserProfile />
    </div>
  );
}
