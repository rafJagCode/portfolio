import styles from './Asteroid.module.scss';
import Explosion from './explosion/Explosion';
import Healthbar from './healthbar/Healthbar';
import useCollisionPointsUpdater from './hooks/useCollisionPointsUpdater';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

export default function Asteroid({ asteroidID, imageName, startingPosition }) {
  const asteroidHits = useSelector((state) => state.asteroidsHits[asteroidID]);
  const dispatch = useDispatch();
  const asteroidRef = useRef(null);
  const [position, setPosition] = useState(startingPosition);
  const asteroidCollisionPoints = useCollisionPointsUpdater(asteroidID, imageName, position);
  const [explosions, setExplosions] = useState([]);

  const updateCollisionZone = () => {
    const asteroid = asteroidRef.current;
    const leftTopCorner = {
      x: asteroid.offsetLeft,
      y: asteroid.offsetTop,
    };
    const rightBottomCorner = {
      x: asteroid.offsetLeft + asteroid.offsetWidth,
      y: asteroid.offsetTop + asteroid.offsetHeight,
    };
    const asteroidCollisionZone = { leftTopCorner, rightBottomCorner };
    dispatch({ type: 'UPDATE_ASTEROID_COLLISION_ZONE', asteroidID, asteroidCollisionZone });
  };

  useEffect(() => {
    updateCollisionZone();
  }, [position]);

  const addExplosion = (hitpoint) => {
    setExplosions((state) => [...state, { id: performance.now() * Math.floor(Math.random() * 1000), hitpoint: hitpoint, size: 50 }]);
  };

  const removeExplosion = (id) => {
    setExplosions((explosions) => explosions.filter((explosion) => explosion.id !== id));
  };

  useEffect(() => {
    if (!asteroidHits || !asteroidHits.length) return;
    addExplosion(asteroidHits.at(-1));
  }, [asteroidHits]);

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
        ref={asteroidRef}
        id={asteroidID}
      >
        <Healthbar asteroidHits={asteroidHits} />
        <img
          src={`/static/images/${imageName}.svg`}
          className={styles.asteroid__image}
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
