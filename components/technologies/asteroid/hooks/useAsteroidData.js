import imagesCollisionData from '@/configuration/images_collision_data';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const useAsteroidData = (asteroidID, imageName, position) => {
  const dispatch = useDispatch();
  const asteroidData = imagesCollisionData[imageName];

  const cleanAsteroidData = () => {
    dispatch({ type: 'CLEAN_ASTEROID_DATA', asteroidID });
  };

  useEffect(() => {
    dispatch({ type: 'UPDATE_ASTEROID_DATA', asteroidID, asteroidData });
  }, []);

  useEffect(() => {
    dispatch({ type: 'UPDATE_ASTEROID_POSITION', asteroidID, posX: position.x, posY: position.y });
  }, [position]);

  return [asteroidData, cleanAsteroidData];
};

export default useAsteroidData;
