import styles from './Asteroid.module.scss';
import Healthbar from './healthbar/Healthbar';
import generateAsteroidShards from './utils/generateAsteroidShards';
import useHealthPoints from './hooks/useHealthPoints';
import useAsteroidExplosions from './hooks/useAsteroidExplosions';
import useAsteroidAnimation from './hooks/useAsteroidAnimation';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import getElementCenterCoordinates from '@/utils/element_functions/getElementCenterCoordinates';

export default function Asteroid({ asteroid, addAsteroid, removeAsteroid, addTechnology }) {
  const asteroidRef = useRef(null);
  const { asteroidID, imageName, startingPosition, asteroidSize, startingHealthPoints, asteroidKind, startingSpeed, technology } = asteroid;
  const asteroidHits = useSelector((state) => state.asteroidsHits[asteroidID]);
  const healthPoints = useHealthPoints(startingHealthPoints, asteroidHits);
  useAsteroidAnimation(startingSpeed, asteroidRef);
  useAsteroidExplosions(asteroidHits, healthPoints, asteroidID);

  const addAsteroidShards = (position) => {
    generateAsteroidShards(position).forEach(addAsteroid);
  };

  const discoverTechnology = (position) => {
    addTechnology(technology, position);
  };

  useEffect(() => {
    if (!healthPoints) {
      if (asteroidKind === 'whole') {
        const position = getElementCenterCoordinates(asteroidRef.current);
        addAsteroidShards(position);
        discoverTechnology(position);
      }
      removeAsteroid(asteroidID);
    }
  }, [healthPoints]);

  return (
    <>
      <div className={styles.container + ' asteroid'} style={{ left: startingPosition.x, top: startingPosition.y }} id={asteroidID} ref={asteroidRef} data-image={imageName}>
        <Healthbar startingHealthPoints={startingHealthPoints} healthPoints={healthPoints} />
        <img src={`/static/images/asteroids/${imageName}.svg`} className={styles.image} style={{ width: asteroidSize }}></img>
      </div>
    </>
  );
}
