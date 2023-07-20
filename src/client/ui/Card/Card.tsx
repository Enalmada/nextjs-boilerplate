import { cx } from '../classNames';
import styles from './Card.module.css';

export function Card(props: JSX.IntrinsicElements['div']) {
  return <div {...props} className={cx(styles.card, props.className)} />;
}
