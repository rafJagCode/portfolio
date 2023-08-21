import styles from './UfoLife.module.scss';

export default function UfoLife({ lifeState }) {
  return <img className={styles.image} src={`/static/images/${lifeState}-ufo-life.svg`}></img>;
}
