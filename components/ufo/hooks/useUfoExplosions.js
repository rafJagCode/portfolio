import { UfoDamage } from '@/components/sections/technologies/explosion/ExplosionTypes';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const useUfoExplosions = () => {
  const ufoHits = useSelector((state) => state.ufoHits);
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
