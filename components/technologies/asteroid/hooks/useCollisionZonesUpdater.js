import { useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';

const useCollisionZonesUpdater = (asteroidID, position, asteroidSize) => {
  const dispatch = useDispatch();

  const asteroidCollisionZone = useMemo(() => {
    const leftTopCorner = {
      x: position.x,
      y: position.y,
    };
    const rightBottomCorner = {
      x: position.x + asteroidSize,
      y: position.y + asteroidSize,
    };
    return {
      leftTopCorner,
      rightBottomCorner,
    };
  }, [position]);

  const updateCollisionZone = () => {
    dispatch({ type: 'UPDATE_ASTEROID_COLLISION_ZONE', asteroidID, asteroidCollisionZone });
  };

  useEffect(() => {
    updateCollisionZone();
  }, [asteroidCollisionZone]);

  return asteroidCollisionZone;
};

export default useCollisionZonesUpdater;
