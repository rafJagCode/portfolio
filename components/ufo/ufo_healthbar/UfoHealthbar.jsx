import styles from './UfoHealthbar.module.scss';
import useUfoLives from './hooks/useUfoLives';
import UfoLife from './ufo_life/UfoLife';

export default function UfoHealthbar() {
  const currentLives = useUfoLives();

  return (
    <div className={styles.ufo_healthbar}>
      {currentLives
        ? currentLives.map((life) => (
            <UfoLife
              key={`ufo_life_${life.index}`}
              lifeState={life.state}
            />
          ))
        : null}
    </div>
  );
}
