import { cx } from '../classNames';
import styles from './ButtonGroup.module.css';

export function ButtonGroup(props: JSX.IntrinsicElements['div']) {
  return <div {...props} className={cx(styles.group, props.className)} />;
}
