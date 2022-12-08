import styles from './Asteroid.module.scss';
import Healthbar from './healthbar/Healthbar';
import useAsteroidData from './hooks/useAsteroidData';
import useHealthPoints from './hooks/useHealthPoints';
import useAsteroidExplosions from './hooks/useAsteroidExplosions';
import generateAsteroidShards from './utils/generateAsteroidShards';
import useAsteroidAnimation from './hooks/useAsteroidAnimation';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function Asteroid({ asteroid, addAsteroid, removeAsteroid }) {
  const getAsteroidCenterPosition = () => {
    const asteroidCenterPosition = { x: position.x + asteroidSize / 2, y: position.y + asteroidSize / 2 };
    return asteroidCenterPosition;
  };
  const { asteroidID, imageName, startingPosition, asteroidSize, startingHealthPoints, asteroidKind, startingSpeed } = asteroid;
  const [position, setPosition] = useState(startingPosition);
  const asteroidHits = useSelector((state) => state.asteroidsHits[asteroidID]);
  const healthPoints = useHealthPoints(startingHealthPoints, asteroidHits);
  const [asteroidData, cleanAsteroidData] = useAsteroidData(asteroidID, imageName, position);
  useAsteroidAnimation(asteroidData, startingSpeed, position, setPosition, asteroidID);
  useAsteroidExplosions(asteroidHits, healthPoints, getAsteroidCenterPosition);

  const addAsteroidShards = () => {
    if (asteroidKind !== 'whole') return;
    const asteroidShards = generateAsteroidShards(position);
    asteroidShards.forEach(addAsteroid);
  };

  useEffect(() => {
    if (!healthPoints) {
      cleanAsteroidData();
      addAsteroidShards();
      removeAsteroid(asteroidID);
    }
  }, [healthPoints]);

  return (
    <>
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
    </>
  );
}
