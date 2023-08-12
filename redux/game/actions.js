import types from './types';

const setGameState = (gameState) => ({ type: types.SET_GAME_STATE, gameState });
const addAsteroidHit = (asteroidID, hitpoint) => ({ type: types.ADD_ASTEROID_HIT, asteroidID, hitpoint });
const updateKeyState = (key) => ({ type: types.UPDATE_KEY_STATE, key });
const setCorsshairAngle = (angle) => ({ type: types.SET_CROSSHAIR_ANGLE, angle });
const addExplosion = (explosion) => ({ type: types.ADD_EXPLOSION, explosion });
const removeExplosion = (explosionID) => ({ type: types.REMOVE_EXPLOSION, explosionID });
const addUfoHit = (hitpoint) => ({ type: types.ADD_UFO_HIT, hitpoint });
const clearUfoHits = () => ({ type: types.CLEAR_UFO_HITS });
const updateTechnologies = (technologyName, unlocked) => ({ type: types.UPDATE_TECHNOLOGIES, technologyName, unlocked });

export default {
  setGameState,
  addAsteroidHit,
  updateKeyState,
  setCorsshairAngle,
  addExplosion,
  removeExplosion,
  addUfoHit,
  clearUfoHits,
  updateTechnologies,
};
