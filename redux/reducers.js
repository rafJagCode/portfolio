import types from './types';
import { combineReducers } from 'redux';
import { animationsTypes, refsTypes } from '@/types';

const LANGUAGE = 'pl';

const language = (state = LANGUAGE, action) => {
  switch (action.type) {
    case types.CHANGE_LANGUAGE:
      localStorage.setItem('language', action.language);
      document.documentElement.lang = action.language;
      return action.language;
    default:
      return state;
  }
};

const IS_SIDEBAR_OPEN = false;

const isSidebarOpen = (state = IS_SIDEBAR_OPEN, action) => {
  switch (action.type) {
    case types.CHANGE_SIDEBAR_STATE:
      return !state;
    default:
      return state;
  }
};

const CLICKED_COW_REF = null;

const clickedCowRef = (state = CLICKED_COW_REF, action) => {
  switch (action.type) {
    case types.SET_CLICKED_COW_REF:
      return action.cowRef;
    default:
      return state;
  }
};

const GLOBAL_REFS = {
  [refsTypes.EARTH_REF]: null,
  [refsTypes.LANGUAGE_CONTROLLER_REF]: null,
  [refsTypes.TOPBAR_MENU_REF]: null,
  [refsTypes.UFO_REF]: null,
};

const globalRefs = (state = GLOBAL_REFS, action) => {
  switch (action.type) {
    case types.GLOBAL_REFS: {
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
    case types.ANIMATIONS: {
      return { ...state, [action.animationName]: action.animation };
    }
    default:
      return state;
  }
};

const TERMINAL = {
  queue: [],
  display: [],
};

const terminal = (state = TERMINAL, action) => {
  switch (action.type) {
    case types.QUEUE_COMMAND: {
      const queue = [...state.queue, action.command];
      return { ...state, queue: queue };
    }
    case types.REMOVE_COMMAND_FROM_QUEUE: {
      const queue = state.queue.filter((command) => command !== action.command);
      return { ...state, queue: queue };
    }
    case types.DISPLAY_COMMAND: {
      const display = [...state.display, action.command];
      return { ...state, display: display };
    }
    case types.CLEAR_TERMINAL: {
      return state;
    }
    default:
      return state;
  }
};

export default combineReducers({
  language,
  isSidebarOpen,
  clickedCowRef,
  globalRefs,
  animations,
  terminal,
});
