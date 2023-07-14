import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.container}>
      <p className={styles.author}>Zaprojektował i zakodował Rafał Jagielski</p>
      <p className={styles.copyright}>Copyright &copy;2021 Rafał Jagielski</p>
    </footer>
  );
}
