import Link from 'next/link';

import { HomeIcon } from '../icons/HomeIcon';
import styles from './HomeLink.module.css';

export function HomeLink() {
  return (
    <Link className={styles.home} href="/">
      <HomeIcon />
    </Link>
  );
}
