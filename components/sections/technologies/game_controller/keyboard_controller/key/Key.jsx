import useTranslation from '@/translation/useTranslation';
import styles from './Key.module.scss';

export default function Key({ properties }) {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img className={styles.image} src={`/static/images/keys/${properties.name}-key.svg`} alt={`Key ${properties.name}`} />
      </div>
      <div className={styles.key_desc_container}>
        <p className={styles.key_desc}>{t(properties.description)}</p>
      </div>
    </div>
  );
}
