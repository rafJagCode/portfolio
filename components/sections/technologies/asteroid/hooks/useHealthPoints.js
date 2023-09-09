import { useEffect, useState } from 'react';

const useHealthPoints = (startingHealthPoints, asteroidHits) => {
  const [healthPoints, setHealthPoints] = useState(startingHealthPoints);

  useEffect(() => {
    if (!asteroidHits || !asteroidHits.length) return;
    setHealthPoints(startingHealthPoints - asteroidHits.length);
  }, [asteroidHits]);

  return healthPoints;
};

export default useHealthPoints;
