import types from './types';

const changeNavigationVisibility = (visible) => ({ type: types.CHANGE_NAVIGATION_VISIBILITY, visible });
const changeSidebarState = () => ({ type: types.CHANGE_SIDEBAR_STATE });

export default {
  changeNavigationVisibility,
  changeSidebarState,
};
