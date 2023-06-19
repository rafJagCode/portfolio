import styles from './Key.module.scss';

export default function Key({ keyName, keyDescription }) {
  return (
    <div className={styles.key}>
      <div className={styles.key__image_container}>
        <img
          className={styles.key__image}
          src={`/static/images/keys/${keyName}-key.svg`}
          alt={`Key ${keyName}`}
        />
      </div>
      <div className={styles.key__desc_container}>
        <p className={styles.key__desc}>{keyDescription}</p>
      </div>
    </div>
  );
}
