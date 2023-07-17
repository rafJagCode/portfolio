import types from './types';
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

const IS_NAVIGATION_VISIBLE = true;

const isNavigationVisible = (state = IS_NAVIGATION_VISIBLE, action) => {
  switch (action.type) {
    case types.CHANGE_NAVIGATION_VISIBILITY: {
      return action.visible;
    }
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

const UFO_POSITION = null;

const ufoPosition = (state = UFO_POSITION, action) => {
  switch (action.type) {
    case types.UPDATE_UFO_POSITION: {
      return action.position;
    }
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
  [refsTypes.UFO_REF]: null,
  [refsTypes.ENGINE_REF]: null,
  [refsTypes.BEAM_REF]: null,
  [refsTypes.LANGUAGE_CONTROLLER_REF]: null,
  [refsTypes.TOPBAR_MENU_REF]: null,
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
  directory: null,
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
      if (action.clearOnlyDisplay) return { directory: state.directory, queue: state.queue, display: [] };
      return { ...TERMINAL };
    }
    case types.CHANGE_DIRECTORY: {
      return { ...state, directory: action.directory };
    }
    default:
      return state;
  }
};

const DIALOG = {
  message: null,
  isVisible: false,
};

const dialog = (state = DIALOG, action) => {
  switch (action.type) {
    case types.SHOW_DIALOG: {
      return { message: action.message, isVisible: true };
    }
    case types.HIDE_DIALOG: {
      return { message: null, isVisible: false };
    }
    default:
      return state;
  }
};

const SIGNALS_ON = false;

const signalsOn = (state = SIGNALS_ON, action) => {
  switch (action.type) {
    case types.TURN_SIGNALS_ON: {
      return true;
    }
    case types.TURN_SIGNALS_OFF: {
      return false;
    }
    default:
      return state;
  }
};

export default {
  language,
  isNavigationVisible,
  isSidebarOpen,
  ufoPosition,
  clickedCowRef,
  globalRefs,
  animations,
  terminal,
  dialog,
  signalsOn,
};
