import styles from './UfoLife.module.scss';

export default function UfoLife({ lifeState }) {
  const imageDir = '/static/images/';
  const image = lifeState === 'FULL' ? 'full-ufo-life.svg' : 'empty-ufo-life.svg';
  return (
    <img
      className={styles.ufo_life}
      src={imageDir + image}
    ></img>
  );
}
