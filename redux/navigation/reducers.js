import types from './types';

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

export default {
  isNavigationVisible,
  isSidebarOpen,
};
