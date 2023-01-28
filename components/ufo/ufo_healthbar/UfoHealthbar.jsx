import styles from './UfoHealthbar.module.scss';
import useUfoLives from './hooks/useUfoLives';
import UfoLife from './ufo_life/UfoLife';
import { useSelector } from 'react-redux';

export default function UfoHealthbar() {
  const gameState = useSelector((state) => state.gameState);
  const currentLives = useUfoLives();

  if (gameState !== 'STARTED') return null;

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
