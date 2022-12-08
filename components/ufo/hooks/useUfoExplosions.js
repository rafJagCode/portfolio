import { UfoDamage } from '@/components/technologies/explosion/ExplosionTypes';
import { useEffect, useState } from 'react';

const useUfoExplosions = (ufoHits) => {
  const [explosions, setExplosions] = useState([]);

  const removeExplosion = (explosionID) => {
    setExplosions((state) => state.filter((explosion) => explosion.explosionID !== explosionID));
  };

  useEffect(() => {
    if (!ufoHits.length) return;
    const position = ufoHits.at(-1);
    const explosion = new UfoDamage(position);
    setExplosions((state) => [...state, explosion]);
  }, [ufoHits]);

  return [explosions, removeExplosion];
};

export default useUfoExplosions;
