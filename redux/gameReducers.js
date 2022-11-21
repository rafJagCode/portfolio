import types from './types';
import availableKeys from '@/components/technologies/game_controller/availableKeys';

const GAME_STATE = 'FINISHED';

const gameState = (state = GAME_STATE, action) => {
  switch (action.type) {
    case types.SET_GAME_STATE: {
      return action.gameState;
    }
    default:
      return state;
  }
};

const ASTEROIDS_COLLISION_ZONES = {};

const asteroidsCollisionZones = (state = ASTEROIDS_COLLISION_ZONES, action) => {
  switch (action.type) {
    case types.UPDATE_ASTEROID_COLLISION_ZONE: {
      return { ...state, [action.asteroidID]: action.asteroidCollisionZone };
    }
    default:
      return state;
  }
};

const ASTEROIDS_COLLISION_POINTS = {};

const asteroidsCollisionPoints = (state = ASTEROIDS_COLLISION_POINTS, action) => {
  switch (action.type) {
    case types.UPDATE_ASTEROID_COLLISION_POINTS: {
      return { ...state, [action.asteroidID]: action.asteroidCollisionPoints };
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
  asteroidsCollisionZones,
  asteroidsCollisionPoints,
  asteroidsHits,
  keys,
  crosshairAngle,
};
