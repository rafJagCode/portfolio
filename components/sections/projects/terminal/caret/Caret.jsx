import styles from './Caret.module.scss';
export default function Caret({ shouldBlink }) {
  return <span className={styles.caret + (shouldBlink ? ` ${styles.caret__blinking}` : '')}></span>;
}
