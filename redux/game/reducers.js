import types from './types';
import startingAsteroids from '@/configuration/asteroids_setup_conf';
import availableKeys from '@/configuration/available_keys_conf';
import knownTechnologies from '@/configuration/technologies_conf';
import { gameStates, getUpdatedGameState } from './gameStateMachine';
import uuid from 'react-uuid';

const GAME_STATE = gameStates.INITIAL_STATE;

const gameState = (state = GAME_STATE, action) => {
  switch (action.type) {
    case types.UPDATE_GAME_STATE: {
      return getUpdatedGameState(state, action.action);
    }
    default:
      return state;
  }
};

const ASTEROIDS = startingAsteroids;

const asteroids = (state = ASTEROIDS, action) => {
  switch (action.type) {
    case types.ADD_ASTEROID: {
      return [...state, action.asteroid];
    }
    case types.REMOVE_ASTEROID: {
      return state.filter((asteroid) => asteroid.asteroidID !== action.asteroidID);
    }
    case types.CLEAR_ASTEROIDS: {
      return ASTEROIDS.map((asteroid) => ({ ...asteroid, asteroidID: uuid() }));
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
    case types.CLEAR_ASTEROIDS_HITS: {
      return ASTEROIDS_HITS;
    }
    default:
      return state;
  }
};

const KEYS = availableKeys.reduce((a, v) => ({ ...a, [v]: { pressed: false } }), {});

const keys = (state = KEYS, action) => {
  switch (action.type) {
    case types.UPDATE_KEY_STATE: {
      return { ...state, [action.key]: { ...state[action.key], pressed: action.pressed } };
    }
    case types.CLEAR_KEYS: {
      return KEYS;
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

const EXPLOSIONS = [];

const explosions = (state = EXPLOSIONS, action) => {
  switch (action.type) {
    case types.ADD_EXPLOSION: {
      return [...state, action.explosion];
    }
    case types.REMOVE_EXPLOSION: {
      return state.filter((explosion) => explosion.explosionID !== action.explosionID);
    }
    default:
      return state;
  }
};

const UFO_HITS = [];

const ufoHits = (state = UFO_HITS, action) => {
  switch (action.type) {
    case types.ADD_UFO_HIT: {
      return [...state, action.hitpoint];
    }
    case types.CLEAR_UFO_HITS: {
      return [];
    }
    default:
      return state;
  }
};

const TECHNOLOGIES = knownTechnologies.map((technology) => ({ name: technology.name, link: technology.link, desc: technology.desc, unlocked: false }));

const technologies = (state = TECHNOLOGIES, action) => {
  switch (action.type) {
    case types.UPDATE_TECHNOLOGIES: {
      return state.map((technology) => (technology.name === action.technologyName ? { ...technology, unlocked: action.unlocked } : technology));
    }
    case types.CLEAR_TECHNOLOGIES: {
      return TECHNOLOGIES;
    }
    default:
      return state;
  }
};

const AMMUNITION = new Array(5).fill('full');

const ammunition = (state = AMMUNITION, action) => {
  switch (action.type) {
    case types.DECREASE_AMMUNITION: {
      const emptyBullets = state.indexOf('full');
      return state.map((bullet, index) => (index <= emptyBullets ? 'empty' : 'full'));
    }
    case types.RELOAD_AMMUNITION: {
      return AMMUNITION;
    }
    default:
      return state;
  }
};

const UFO_LIVES = new Array(5).fill('full');

const ufoLives = (state = UFO_LIVES, action) => {
  switch (action.type) {
    case types.LOSE_LIFE: {
      const emptyLives = state.indexOf('full');
      return state.map((life, index) => (index <= emptyLives ? 'empty' : 'full'));
    }
    case types.RESET_LIVES: {
      return UFO_LIVES;
    }
    default:
      return state;
  }
};

export default {
  gameState,
  asteroids,
  asteroidsHits,
  keys,
  crosshairAngle,
  explosions,
  ufoHits,
  technologies,
  ammunition,
  ufoLives,
};
