import styles from './Satellite.module.scss';

export default function Satellite() {
  return (
    <img
      className={styles.satellite}
      src="/static/images/satellite.svg"
      alt="satellite"
    />
  );
}
