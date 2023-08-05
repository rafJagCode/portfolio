import startingAsteroids from '@/configuration/asteroids_setup';
import { useState } from 'react';

const useAsteroids = () => {
  const [asteroids, setAsteroids] = useState(startingAsteroids);

  const addAsteroid = (asteroid) => {
    setAsteroids((asteroids) => [...asteroids, asteroid]);
  };

  const removeAsteroid = (asteroidID) => {
    setAsteroids((asteroids) => asteroids.filter((asteroid) => asteroid.asteroidID !== asteroidID));
  };

  return [asteroids, addAsteroid, removeAsteroid];
};

export default useAsteroids;
