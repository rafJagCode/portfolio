import { LaserExplosion } from '@/components/technologies/asteroid/explosion/ExplosionTypes';
import { useEffect, useState } from 'react';

const useExplosions = (asteroidHits) => {
  const [explosions, setExplosions] = useState([]);

  const addExplosion = (explosion) => {
    setExplosions((state) => [...state, explosion]);
  };

  const removeExplosion = (explosionID) => {
    setExplosions((explosions) => explosions.filter((explosion) => explosion.explosionID !== explosionID));
  };

  useEffect(() => {
    if (!asteroidHits || !asteroidHits.length) return;
    const position = asteroidHits.at(-1);
    const explosion = new LaserExplosion(position);
    addExplosion(explosion);
  }, [asteroidHits]);

  return [explosions, addExplosion, removeExplosion];
};

export default useExplosions;
