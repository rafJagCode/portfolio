import styles from './Asteroid.module.scss';
import Explosion from './explosion/Explosion';
import Healthbar from './healthbar/Healthbar';
import useAsteroidData from './hooks/useAsteroidData';
import useExplosions from './hooks/useExplosions';
import useHealthPoints from './hooks/useHealthPoints';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Asteroid({ asteroid }) {
  const { asteroidID, imageName, startingPosition, asteroidSize, startingHealthPoints } = asteroid;
  const asteroidHits = useSelector((state) => state.asteroidsHits[asteroidID]);
  const [position, setPosition] = useState(startingPosition);
  const [explosions, addExplosion, removeExplosion] = useExplosions(asteroidHits);
  const healthPoints = useHealthPoints(startingHealthPoints, asteroidHits);
  const cleanAsteroidData = useAsteroidData(asteroidID, imageName, position);

  useEffect(() => {
    if (!healthPoints) cleanAsteroidData();
  }, [healthPoints]);

  return (
    <>
      {explosions.map((explosion) => {
        return (
          <Explosion
            key={explosion.explosionID}
            explosion={explosion}
            removeExplosion={removeExplosion}
          />
        );
      })}
      <div
        className={styles.asteroid}
        style={{ left: position.x, top: position.y }}
        id={asteroidID}
      >
        <Healthbar
          startingHealthPoints={startingHealthPoints}
          healthPoints={healthPoints}
        />
        <img
          src={`/static/images/${imageName}.svg`}
          className={styles.asteroid__image}
          style={{ width: asteroidSize }}
        ></img>
      </div>
    </>
  );
}
