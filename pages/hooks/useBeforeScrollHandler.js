import actions from 'redux/actions';
import { animationsTypes } from '@/configuration/types_conf';
import { useDispatch, useSelector } from 'react-redux';

const useBeforeScrollHandler = (engineAnimation, orbitingAnimation, scrollActions, updateState) => {
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
    updateState(scrollActions.ALLOW_SCROLL);
  };

  const handleLeavingProjectsSection = async () => {
    dispatch(actions.setClickedCow(null));
    await new Promise((resolve) => setTimeout(resolve, 0));
    await flyToLaunchingPositionAnimation.promise;
    engineAnimation.startAnimation();
    updateState(scrollActions.ALLOW_SCROLL);
    dispatch(actions.clearTerminal());
  };

  const handleLeavingTechnologiesSection = async () => {
    engineAnimation.startAnimation();
    updateState(scrollActions.ALLOW_SCROLL);
  };

  const handleLeavingContactSection = async () => {
    engineAnimation.startAnimation();
    updateState(scrollActions.ALLOW_SCROLL);
  };

  return handleAnimationsBeforeScroll;
};

export default useBeforeScrollHandler;
