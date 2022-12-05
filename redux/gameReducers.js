import types from './types';
import availableKeys from '@/configuration/available_keys';

const GAME_STATE = null;

const gameState = (state = GAME_STATE, action) => {
  switch (action.type) {
    case types.SET_GAME_STATE: {
      return action.gameState;
    }
    default:
      return state;
  }
};

const ASTEROIDS_DATA = {};

const asteroidsData = (state = ASTEROIDS_DATA, action) => {
  switch (action.type) {
    case types.UPDATE_ASTEROID_DATA: {
      return { ...state, [action.asteroidID]: { ...state[action.asteroidID], ...action.asteroidData } };
    }
    case types.UPDATE_ASTEROID_POSITION: {
      if (!state[action.asteroidID]) return state;
      return { ...state, [action.asteroidID]: { ...state[action.asteroidID], posX: action.posX, posY: action.posY } };
    }
    case types.CLEAN_ASTEROID_DATA: {
      const { [action.asteroidID]: dataToRemove, ...remainingData } = state;
      return remainingData;
    }
    default:
      return state;
  }
};

const ASTEROIDS_HITS = {};

const asteroidsHits = (state = ASTEROIDS_HITS, action) => {
  switch (action.type) {
    case types.ADD_ASTEROID_HIT: {
      if (!state[action.asteroidID]) {
        return { ...state, [action.asteroidID]: [action.hitpoint] };
      }
      return { ...state, [action.asteroidID]: [...state[action.asteroidID], action.hitpoint] };
    }
    default:
      return state;
  }
};

const KEYS = availableKeys.reduce((a, v) => ({ ...a, [v]: { pressed: false } }), {});

const keys = (state = KEYS, action) => {
  switch (action.type) {
    case types.UPDATE_KEY_STATE: {
      return { ...state, [action.key]: { ...state[action.key], pressed: !state[action.key].pressed } };
    }
    default:
      return state;
  }
};

const CROSSHAIR_ANGLE = Math.PI;

const crosshairAngle = (state = CROSSHAIR_ANGLE, action) => {
  switch (action.type) {
    case types.SET_CROSSHAIR_ANGLE: {
      return action.angle;
    }
    default:
      return state;
  }
};

export default {
  gameState,
  asteroidsData,
  asteroidsHits,
  keys,
  crosshairAngle,
};
