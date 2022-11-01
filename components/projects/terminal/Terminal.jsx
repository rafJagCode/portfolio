import styles from './Terminal.module.scss';

export default function Terminal() {
  return (
    <div className={styles.terminal}>
      <img
        className={styles.terminal__image}
        src="/static/images/terminal.svg"
        alt="terminal image"
      />
      <div className={styles.terminal__text}>$ECHO 'COW'</div>
    </div>
  );
}
