import { cx } from '../classNames';
import styles from './Badge.module.css';

export function Badge(props: JSX.IntrinsicElements['span']) {
  return <span {...props} className={cx(styles.badge, props.className)} />;
}
