import uuid from 'react-uuid';
import { useEffect, useState } from 'react';

const useExplosions = (asteroidHits) => {
  const [explosions, setExplosions] = useState([]);

  const addExplosion = (hitpoint) => {
    setExplosions((state) => [...state, { id: uuid(), hitpoint: hitpoint, size: 50 }]);
  };

  const removeExplosion = (id) => {
    setExplosions((explosions) => explosions.filter((explosion) => explosion.id !== id));
  };

  useEffect(() => {
    if (!asteroidHits || !asteroidHits.length) return;
    addExplosion(asteroidHits.at(-1));
  }, [asteroidHits]);

  return [explosions, removeExplosion];
};

export default useExplosions;
