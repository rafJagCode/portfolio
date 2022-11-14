import styles from './Terminal.module.scss';
import TerminalText from './TerminalText';

export default function Terminal() {
  return (
    <div className={styles.terminal}>
      <img
        className={styles.terminal__image}
        src="/static/images/terminal.svg"
        alt="terminal image"
      />
      <TerminalText />
    </div>
  );
}
