import { cx } from '../classNames';
import styles from './FormError.module.css';

export function FormError(props: JSX.IntrinsicElements['span']) {
  return <span {...props} className={cx(styles.error, props.className)} />;
}
