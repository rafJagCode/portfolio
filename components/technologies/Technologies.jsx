import styles from './Technologies.module.scss';
import GameController from './game_controller/GameController';
import Crosshair from './crosshair/Crosshair';
import Lasers from './lasers/Lasers';
import Asteroid from './asteroid/Asteroid';
import asteroids from '@/configuration/asteroidsStartingSetup';
import { useSelector } from 'react-redux';

export default function Technologies() {
  const gameState = useSelector((state) => state.gameState);
  return (
    <div className={styles.technologies}>
      {gameState !== 'FINISHED' && <Crosshair />}
      <GameController />
      <Lasers />
      {asteroids.map((asteroid) => {
        return (
          <Asteroid
            key={asteroid.id}
            asteroidID={asteroid.id}
            imageName={asteroid.imageName}
            startingPosition={asteroid.startingPosition}
            asteroidSize={asteroid.asteroidSize}
            startingHealthPoints={asteroid.startingHealthPoints}
          />
        );
      })}
    </div>
  );
}
