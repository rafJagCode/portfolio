import { LaserExplosion, AsteroidExplosion } from '../../explosion/ExplosionTypes';
import types from 'redux/types';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const useAsteroidExplosions = (asteroidHits, healthPoints, getAsteroidCenterPosition) => {
  const dispatch = useDispatch();

  const addExplosion = () => {
    let explosion;
    if (!healthPoints) explosion = new AsteroidExplosion(getAsteroidCenterPosition());
    else explosion = new LaserExplosion(asteroidHits.at(-1));
    dispatch({ type: types.ADD_EXPLOSION, explosion });
  };

  useEffect(() => {
    if (!asteroidHits) return;
    addExplosion();
  }, [asteroidHits, healthPoints]);
};

export default useAsteroidExplosions;
