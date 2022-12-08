import styles from './Technologies.module.scss';
import GameController from './game_controller/GameController';
import Crosshair from './crosshair/Crosshair';
import Lasers from './lasers/Lasers';
import Explosion from './explosion/Explosion';
import Asteroid from './asteroid/Asteroid';
import useAsteroids from './hooks/useAsteroids';
import useExplosions from './hooks/useExplosions';
import { useSelector } from 'react-redux';

export default function Technologies() {
  const [asteroids, addAsteroid, removeAsteroid] = useAsteroids();
  const [explosions, removeExplosion] = useExplosions();
  const gameState = useSelector((state) => state.gameState);

  return (
    <div className={styles.technologies}>
      {gameState === 'STARTED' && <Crosshair />}
      <GameController />
      <Lasers />
      {explosions.map((explosion) => {
        return (
          <Explosion
            key={explosion.explosionID}
            explosion={explosion}
            removeExplosion={removeExplosion}
          />
        );
      })}
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
