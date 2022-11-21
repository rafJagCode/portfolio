import styles from './Asteroid.module.scss';
import Explosion from './explosion/Explosion';
import Healthbar from './healthbar/Healthbar';
import useCollisionPointsUpdater from './hooks/useCollisionPointsUpdater';
import useCollisionZoneUpdater from './hooks/useCollisionZonesUpdater';
import useExplosions from './hooks/useExplosions';
import useHealthPoints from './hooks/useHealthPoints';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Asteroid({ asteroidID, imageName, startingPosition }) {
  const asteroidSize = 100;
  const startingHealthPoints = 5;
  const asteroidHits = useSelector((state) => state.asteroidsHits[asteroidID]);
  const [position, setPosition] = useState(startingPosition);
  const asteroidCollisionPoints = useCollisionPointsUpdater(asteroidID, imageName, position);
  const asteroidCollisionZone = useCollisionZoneUpdater(asteroidID, position, asteroidSize);
  const [explosions, removeExplosion] = useExplosions(asteroidHits);
  const healthPoints = useHealthPoints(startingHealthPoints, asteroidHits);

  return (
    <>
      {explosions.map((explosion) => {
        return (
          <Explosion
            key={explosion.id}
            explosionID={explosion.id}
            hitpoint={explosion.hitpoint}
            size={explosion.size}
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
      {asteroidCollisionPoints?.map((collisionPoint, index) => {
        return (
          <div
            key={index}
            className={styles.test}
            style={{ left: collisionPoint.x, top: collisionPoint.y }}
          ></div>
        );
      })}
    </>
  );
}
