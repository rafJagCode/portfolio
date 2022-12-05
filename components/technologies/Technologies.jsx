import styles from './Technologies.module.scss';
import GameController from './game_controller/GameController';
import Crosshair from './crosshair/Crosshair';
import Lasers from './lasers/Lasers';
import Asteroid from './asteroid/Asteroid';
import useAsteroids from './hooks/useAsteroids';
import { useSelector } from 'react-redux';

export default function Technologies() {
  const [asteroids, addAsteroid, removeAsteroid] = useAsteroids();
  const gameState = useSelector((state) => state.gameState);

  return (
    <div className={styles.technologies}>
      {gameState === 'STARTED' && <Crosshair />}
      <GameController />
      <Lasers />
      {asteroids.map((asteroid) => {
        return (
          <Asteroid
            key={asteroid.asteroidID}
            asteroid={asteroid}
            removeAsteroid={removeAsteroid}
            addAsteroid={addAsteroid}
          />
        );
      })}
    </div>
  );
}
