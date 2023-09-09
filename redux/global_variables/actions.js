import types from './types';

const setGlobalRef = (refName, ref) => ({ type: types.SET_GLOBAL_REF, refName, ref });
const setAnimation = (animationName, animation) => ({ type: types.SET_ANIMATION, animationName, animation });

export default {
  setGlobalRef,
  setAnimation,
};
