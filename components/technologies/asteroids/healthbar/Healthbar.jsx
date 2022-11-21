import styles from './Healthbar.module.scss';

export default function Healthbar() {
  return (
    <div className={styles.healthbar}>
      <div className={styles.healthbar__state}></div>
    </div>
  );
}
