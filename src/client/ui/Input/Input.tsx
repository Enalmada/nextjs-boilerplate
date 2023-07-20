import * as React from 'react';

import { cx } from '../classNames';
import styles from './Input.module.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Input({ children, ...props }: JSX.IntrinsicElements['input']) {
  return <input {...props} className={cx(styles.input, props.className)} />;
}
