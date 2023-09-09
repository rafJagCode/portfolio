import types from './types';
import { refsTypes, animationsTypes } from '@/configuration/types_conf';

const GLOBAL_REFS = {
  [refsTypes.EARTH_REF]: null,
  [refsTypes.UFO_REF]: null,
  [refsTypes.ENGINE_REF]: null,
  [refsTypes.BEAM_REF]: null,
  [refsTypes.LANGUAGE_CONTROLLER_REF]: null,
  [refsTypes.TOPBAR_MENU_REF]: null,
};

const globalRefs = (state = GLOBAL_REFS, action) => {
  switch (action.type) {
    case types.SET_GLOBAL_REF: {
      return { ...state, [action.refName]: action.ref };
    }
    default:
      return state;
  }
};

const ANIMATIONS = {
  [animationsTypes.BEAM_ANIMATION]: null,
  [animationsTypes.ENGINE_ANIMATION]: null,
  [animationsTypes.FLY_TO_COW_ANIMATION]: null,
  [animationsTypes.FLY_TO_LAUNCHING_POSITION_ANIMATION]: null,
  [animationsTypes.HOVER_OVER_COW_ANIMATION]: null,
  [animationsTypes.LIFT_COW_UP_ANIMATION]: null,
  [animationsTypes.ORBITING_ANIMATION]: null,
  [animationsTypes.PUT_COW_DOWN_ANIMATION]: null,
};

const animations = (state = ANIMATIONS, action) => {
  switch (action.type) {
    case types.SET_ANIMATION: {
      return { ...state, [action.animationName]: action.animation };
    }
    default:
      return state;
  }
};

export default {
  globalRefs,
  animations,
};
