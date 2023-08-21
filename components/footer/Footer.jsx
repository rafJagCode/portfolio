import styles from './Footer.module.scss';
import useTranslation from '@/translation/useTranslation';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={styles.container}>
      <p className={styles.author}>{t('FOOTER_TEXT')}</p>
      <p className={styles.copyright}>Copyright &copy;2021 Rafał Jagielski</p>
    </footer>
  );
}
