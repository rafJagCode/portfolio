import styles from './Healthbar.module.scss';

export default function Healthbar({ startingHealthPoints, healthPoints }) {
  return (
    <div className={styles.healthbar}>
      <div
        className={styles.healthbar__state}
        style={{ width: `${(healthPoints / startingHealthPoints) * 100}%` }}
      ></div>
    </div>
  );
}
