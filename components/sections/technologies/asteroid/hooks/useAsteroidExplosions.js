import { LaserExplosion, AsteroidExplosion } from '../../explosion/ExplosionTypes';
import getElementCenterCoordinates from '@/utils/element_functions/getElementCenterCoordinates';
import actions from 'redux/actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const useAsteroidExplosions = (asteroidHits, healthPoints, asteroidID) => {
  const dispatch = useDispatch();

  const getAsteroidCenterPosition = () => {
    const asteroid = document.getElementById(asteroidID);
    return getElementCenterCoordinates(asteroid);
  };

  const addExplosion = () => {
    let explosion;
    if (!healthPoints) explosion = new AsteroidExplosion(getAsteroidCenterPosition());
    else explosion = new LaserExplosion(asteroidHits.at(-1));
    dispatch(actions.addExplosion(explosion));
  };

  useEffect(() => {
    if (!asteroidHits) return;
    addExplosion();
  }, [asteroidHits, healthPoints]);
};

export default useAsteroidExplosions;
