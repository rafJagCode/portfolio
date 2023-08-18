import useTranslation from '@/translation/useTranslation';
import styles from './Key.module.scss';

export default function Key({ keyName, keyDescription }) {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img className={styles.image} src={`/static/images/keys/${keyName}-key.svg`} alt={`Key ${keyName}`} />
      </div>
      <div className={styles.key_desc_container}>
        <p className={styles.key_desc}>{t(keyDescription)}</p>
      </div>
    </div>
  );
}
