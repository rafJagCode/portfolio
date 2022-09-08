import types from './types';
import { combineReducers } from 'redux';

const INITIAL_LANGUAGE = 'pl';

const language = (state = INITIAL_LANGUAGE, action) => {
  switch (action.type) {
    case types.CHANGE_LANGUAGE:
      localStorage.setItem('language', action.language);
      document.documentElement.lang = action.language;
      return action.language;
    default:
      return state;
  }
};

const FULLPAGE_API = null;

const fullpageApi = (state = FULLPAGE_API, action) => {
  switch (action.type) {
    case types.SET_FULLPAGE_API:
      return action.fullpageApi;
    default:
      return state;
  }
};

const SIDEBAR_OPEN = false;

const sidebarOpen = (state = SIDEBAR_OPEN, action) => {
  switch (action.type) {
    case types.CHANGE_SIDEBAR_STATE:
      return !state;
    default:
      return state;
  }
};

const HOVERED_COW = null;

const hoveredCow = (state = HOVERED_COW, action) => {
  switch (action.type) {
    case types.SET_HOVERED_COW:
      return action.cow;
    default:
      return state;
  }
};

const SET_GLOBAL_REFS = {
  earth: null,
  ufo: null,
  topbarMenu: null,
  languageController: null,
};

const globalRefs = (state = SET_GLOBAL_REFS, action) => {
  switch (action.type) {
    case types.SET_GLOBAL_REFS: {
      return { ...state, [action.element]: action.ref };
    }
    default:
      return state;
  }
};

export default combineReducers({
  language,
  fullpageApi,
  sidebarOpen,
  hoveredCow,
  globalRefs,
});
