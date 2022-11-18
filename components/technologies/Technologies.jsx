import styles from './Technologies.module.scss';
import Lasers from './lasers/Lasers';
import Asteroid from './asteroids/Asteroid';
import asteroids from './asteroids/asteroidsStartingSetup';

export default function Technologies() {
  return (
    <div className={styles.technologies}>
      <Lasers />
      {asteroids.map((asteroid) => {
        return (
          <Asteroid
            key={asteroid.id}
            asteroidID={asteroid.id}
            imageName={asteroid.imageName}
            startingPosition={asteroid.startingPosition}
          />
        );
      })}
    </div>
  );
}
