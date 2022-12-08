import { LaserExplosion, AsteroidExplosion } from '@/components/technologies/explosion/ExplosionTypes';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const useAsteroidExplosions = (asteroidHits, healthPoints, getAsteroidCenterPosition) => {
  const dispatch = useDispatch();

  const addExplosion = () => {
    let explosion;
    if (!healthPoints) explosion = new AsteroidExplosion(getAsteroidCenterPosition());
    else explosion = new LaserExplosion(asteroidHits.at(-1));
    dispatch({ type: 'ADD_EXPLOSION', explosion });
  };

  useEffect(() => {
    if (!asteroidHits) return;
    addExplosion();
  }, [asteroidHits, healthPoints]);
};

export default useAsteroidExplosions;
