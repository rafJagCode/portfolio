import imagesCollisionData from '@/configuration/imagesCollisionData';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const useAsteroidData = (asteroidID, imageName, position) => {
  const dispatch = useDispatch();

  const cleanAsteroidData = () => {
    dispatch({ type: 'CLEAN_ASTEROID_DATA', asteroidID });
  };

  useEffect(() => {
    dispatch({ type: 'UPDATE_ASTEROID_DATA', asteroidID, asteroidData: imagesCollisionData[imageName] });
  }, []);

  useEffect(() => {
    dispatch({ type: 'UPDATE_ASTEROID_POSITION', asteroidID, posX: position.x, posY: position.y });
  }, [position]);

  return cleanAsteroidData;
};

export default useAsteroidData;
