import styles from './Asteroid.module.scss';
import Explosion from './explosion/Explosion';
import Healthbar from './healthbar/Healthbar';
import useCollisionPointsUpdater from './hooks/useCollisionPointsUpdater';
import useCollisionZoneUpdater from './hooks/useCollisionZonesUpdater';
import useExplosions from './hooks/useExplosions';
import { useSelector } from 'react-redux';
import { useState, useMemo } from 'react';

export default function Asteroid({ asteroidID, imageName, startingPosition }) {
  const asteroidSize = useMemo(() => 100);
  const asteroidHits = useSelector((state) => state.asteroidsHits[asteroidID]);
  const [position, setPosition] = useState(startingPosition);
  const asteroidCollisionPoints = useCollisionPointsUpdater(asteroidID, imageName, position);
  const asteroidCollisionZone = useCollisionZoneUpdater(asteroidID, position, asteroidSize);
  const [explosions, removeExplosion] = useExplosions(asteroidHits);

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
        <Healthbar asteroidHits={asteroidHits} />
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
