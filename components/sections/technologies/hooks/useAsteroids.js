import actions from 'redux/actions';
import { useSelector, useDispatch } from 'react-redux';

const useAsteroids = () => {
  const asteroids = useSelector((state) => state.asteroids);
  const dispatch = useDispatch();

  const addAsteroid = (asteroid) => {
    dispatch(actions.addAsteroid(asteroid));
  };

  const removeAsteroid = (asteroidID) => {
    dispatch(actions.removeAsteroid(asteroidID));
  };

  return [asteroids, addAsteroid, removeAsteroid];
};

export default useAsteroids;
