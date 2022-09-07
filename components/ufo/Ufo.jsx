import styles from './Ufo.module.scss';

const Ufo = () => {
  return (
    <div className={styles.ufo}>
      <div className={styles.ufo__image}></div>
      <div className={styles.ufo__fire}></div>
    </div>
  );
};

export default Ufo;
