import styles from './Asteroid.module.scss';
import Explosion from './explosion/Explosion';
import Healthbar from './healthbar/Healthbar';
import useAsteroidData from './hooks/useAsteroidData';
import useExplosions from './hooks/useExplosions';
import useHealthPoints from './hooks/useHealthPoints';
import generateAsteroidShards from './utils/generateAsteroidShards';
import { AsteroidExplosion } from '@/components/technologies/asteroid/explosion/ExplosionTypes';
import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import AsteroidAnimation from './animations/AsteroidAnimation';

export default function Asteroid({ asteroid, addAsteroid, removeAsteroid }) {
  const { asteroidID, imageName, startingPosition, asteroidSize, startingHealthPoints, asteroidKind, startingSpeed } = asteroid;
  const asteroidHits = useSelector((state) => state.asteroidsHits[asteroidID]);
  const [isAsteroidDestroyed, setIsAsteroidDestroyed] = useState(false);
  const [position, setPosition] = useState(startingPosition);
  const [explosions, addExplosion, removeExplosion] = useExplosions(asteroidHits);
  const healthPoints = useHealthPoints(startingHealthPoints, asteroidHits);
  const [asteroidData, cleanAsteroidData] = useAsteroidData(asteroidID, imageName, position);
  const asteroidAnimationRef = useRef(null);

  const getAsteroidCenterPosition = () => {
    const asteroidCenterPosition = { x: position.x + asteroidSize / 2, y: position.y + asteroidSize / 2 };
    return asteroidCenterPosition;
  };

  const addAsteroidShards = () => {
    if (asteroidKind !== 'whole') return;
    const asteroidShards = generateAsteroidShards(position);
    asteroidShards.forEach(addAsteroid);
  };

  useEffect(() => {
    if (healthPoints) return;
    asteroidAnimationRef.current.stop();
    cleanAsteroidData();
    const asteroidCenterPosition = getAsteroidCenterPosition();
    addExplosion(new AsteroidExplosion(asteroidCenterPosition));
    setTimeout(() => {
      setIsAsteroidDestroyed(true);
      addAsteroidShards();
    }, 500);
  }, [healthPoints]);

  useEffect(() => {
    if (healthPoints || explosions.length) return;
    removeAsteroid(asteroidID);
  }, [healthPoints, explosions]);

  useEffect(() => {
    asteroidAnimationRef.current = new AsteroidAnimation(asteroidData, startingSpeed, position, setPosition);
    asteroidAnimationRef.current.start();
    return () => {
      asteroidAnimationRef.current.stop();
    };
  }, []);

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
      {!isAsteroidDestroyed && (
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
            src={`/static/images/asteroids/${imageName}.svg`}
            className={styles.asteroid__image}
            style={{ width: asteroidSize }}
          ></img>
        </div>
      )}
    </>
  );
}
