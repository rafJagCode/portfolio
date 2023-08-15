import types from './types';

const updateGameState = (action) => ({ type: types.UPDATE_GAME_STATE, action });
const addAsteroid = (asteroid) => ({ type: types.ADD_ASTEROID, asteroid });
const removeAsteroid = (asteroidID) => ({ type: types.REMOVE_ASTEROID, asteroidID });
const clearAsteroids = () => ({ type: types.CLEAR_ASTEROIDS });
const addAsteroidHit = (asteroidID, hitpoint) => ({ type: types.ADD_ASTEROID_HIT, asteroidID, hitpoint });
const clearAsteroidsHits = () => ({ type: types.CLEAR_ASTEROIDS_HITS });
const updateKeyState = (key, pressed) => ({ type: types.UPDATE_KEY_STATE, key, pressed });
const setCorsshairAngle = (angle) => ({ type: types.SET_CROSSHAIR_ANGLE, angle });
const addExplosion = (explosion) => ({ type: types.ADD_EXPLOSION, explosion });
const removeExplosion = (explosionID) => ({ type: types.REMOVE_EXPLOSION, explosionID });
const addUfoHit = (hitpoint) => ({ type: types.ADD_UFO_HIT, hitpoint });
const clearUfoHits = () => ({ type: types.CLEAR_UFO_HITS });
const updateTechnologies = (technologyName, unlocked) => ({ type: types.UPDATE_TECHNOLOGIES, technologyName, unlocked });
const clearTechnologies = () => ({ type: types.CLEAR_TECHNOLOGIES });
const decreaseAmmunition = () => ({ type: types.DECREASE_AMMUNITION });
const reloadAmmunition = () => ({ type: types.RELOAD_AMMUNITION });

export default {
  updateGameState,
  addAsteroid,
  removeAsteroid,
  clearAsteroids,
  addAsteroidHit,
  clearAsteroidsHits,
  updateKeyState,
  setCorsshairAngle,
  addExplosion,
  removeExplosion,
  addUfoHit,
  clearUfoHits,
  updateTechnologies,
  clearTechnologies,
  decreaseAmmunition,
  reloadAmmunition,
};
