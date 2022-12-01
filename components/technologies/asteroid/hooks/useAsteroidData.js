import imagesCollisionData from '@/configuration/imagesCollisionData';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const useAsteroidData = (asteroidID, imageName, position) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'UPDATE_ASTEROID_DATA', asteroidID, asteroidData: imagesCollisionData[imageName] });
  }, []);

  useEffect(() => {
    dispatch({ type: 'UPDATE_ASTEROID_POSITION', asteroidID, posX: position.x, posY: position.y });
  }, [position]);
};

export default useAsteroidData;
