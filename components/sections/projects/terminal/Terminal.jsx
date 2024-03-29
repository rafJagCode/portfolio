import styles from './Terminal.module.scss';
import TerminalText from './terminal_text/TerminalText';

export default function Terminal() {
  return (
    <div className={styles.container}>
      <img className={styles.image} src='/static/images/terminal.svg' alt='terminal image' />
      <TerminalText />
    </div>
  );
}
