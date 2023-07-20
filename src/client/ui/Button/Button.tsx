import * as React from 'react';

import { cx } from '../classNames';
import { LoadingIcon } from '../icons';
import styles from './Button.module.css';

const variantClassNames = {
  contained: styles.contained,
  outlined: styles.outlined,
};

export function Button({
  loading,
  children,
  variant = 'outlined',
  ...props
}: JSX.IntrinsicElements['button'] & {
  loading?: boolean;
  variant?: 'contained' | 'outlined';
}) {
  return (
    <button {...props} className={cx(styles.button, variantClassNames[variant], props.className)}>
      {loading && <LoadingIcon className={styles.icon} />}
      <span>{children}</span>
    </button>
  );
}
