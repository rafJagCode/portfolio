import types from 'redux/types';
import { animationsTypes } from '@/types';
import { useDispatch, useSelector } from 'react-redux';

const useBeforeScrollHandler = (engineAnimation, orbitingAnimation, updateState) => {
  const flyToLaunchingPositionAnimation = useSelector((state) => state.animations[animationsTypes.FLY_TO_LAUNCHING_POSITION_ANIMATION]);
  const dispatch = useDispatch();

  const handleAnimationsBeforeScroll = (origin) => {
    if (origin.anchor === '#home') handleLeavingHomeSection();
    if (origin.anchor === '#projects') handleLeavingProjectsSection();
    if (origin.anchor === '#technologies') handleLeavingTechnologiesSection();
    if (origin.anchor === '#contact') handleLeavingContactSection();
  };

  const handleLeavingHomeSection = async () => {
    engineAnimation.startAnimation();
    await orbitingAnimation.stopAnimation();
    updateState('ALLOW_SCROLL');
  };

  const handleLeavingProjectsSection = async () => {
    dispatch({ type: types.SET_CLICKED_COW, cow: null });
    await new Promise((resolve) => setTimeout(resolve, 0));
    await flyToLaunchingPositionAnimation.promise;
    engineAnimation.startAnimation();
    updateState('ALLOW_SCROLL');
    dispatch({ type: types.CLEAR_TERMINAL });
  };

  const handleLeavingTechnologiesSection = async () => {
    engineAnimation.startAnimation();
    updateState('ALLOW_SCROLL');
  };

  const handleLeavingContactSection = async () => {
    engineAnimation.startAnimation();
    updateState('ALLOW_SCROLL');
  };

  return handleAnimationsBeforeScroll;
};

export default useBeforeScrollHandler;
