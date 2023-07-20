import { cx } from '../classNames';
import styles from './IconButton.module.css';

export function IconButton(props: JSX.IntrinsicElements['button']) {
  return (
    <button
      {...props}
      className={cx(styles.button, props.className)}
      type={props.type ?? 'button'}
    />
  );
}
