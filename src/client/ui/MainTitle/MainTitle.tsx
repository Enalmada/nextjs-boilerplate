import { cx } from '../classNames';
import styles from './MainTitle.module.css';

export function MainTitle(props: JSX.IntrinsicElements['h1']) {
  return <h1 {...props} className={cx(styles.title, props.className)} />;
}
