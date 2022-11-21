import imagesCollisionPoints from '../imagesCollisionPoints';
import { useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';

const useCollisionPointsUpdater = (asteroidID, imageName, position) => {
  const dispatch = useDispatch();

  const asteroidCollisionPoints = useMemo(() => {
    return imagesCollisionPoints[imageName].map((point) => ({ x: point.x + position.x, y: point.y + position.y }));
  }, [position]);

  const updateCollisionPoints = () => {
    dispatch({ type: 'UPDATE_ASTEROID_COLLISION_POINTS', asteroidID, asteroidCollisionPoints });
  };

  useEffect(() => {
    updateCollisionPoints();
  }, [asteroidCollisionPoints]);

  return asteroidCollisionPoints;
};

export default useCollisionPointsUpdater;
