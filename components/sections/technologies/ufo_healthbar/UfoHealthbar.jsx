import styles from './UfoHealthbar.module.scss';
import useUfoLives from './hooks/useUfoLives';
import UfoLife from './ufo_life/UfoLife';

export default function UfoHealthbar() {
  const ufoLives = useUfoLives();

  return (
    <div className={styles.container}>
      {ufoLives.map((lifeState, index) => (
        <UfoLife key={index} lifeState={lifeState} />
      ))}
    </div>
  );
}
