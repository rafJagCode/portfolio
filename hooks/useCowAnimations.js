import { useDispatch, useSelector } from 'react-redux';
import { animationsTypes } from '@/types';

const useCowAnimations = () => {
  const dispatch = useDispatch();
  const flyToCowAnimation = useSelector((state) => state.animations[animationsTypes.FLY_TO_COW_ANIMATION]);
  const putCowDownAnimation = useSelector((state) => state.animations[animationsTypes.PUT_COW_DOWN_ANIMATION]);
  const beamAnimation = useSelector((state) => state.animations[animationsTypes.BEAM_ANIMATION]);
  const hoveOverCowAnimation = useSelector((state) => state.animations[animationsTypes.HOVER_OVER_COW_ANIMATION]);
  const flyToLaunchingPositionAnimation = useSelector((state) => state.animations[animationsTypes.FLY_TO_LAUNCHING_POSITION_ANIMATION]);
  const clickedCowRef = useSelector((state) => state.clickedCowRef);

  const stopCowAbduction = async () => {
    if (!clickedCowRef) return;
    dispatch({ type: 'SET_CLICKED_COW_REF', cowRef: null });
    flyToCowAnimation.stopAnimation();
    await putCowDownAnimation.startAnimation();
    beamAnimation.stopAnimation();
    hoveOverCowAnimation.stopAnimation();
    return await flyToLaunchingPositionAnimation.startAnimation();
  };

  return stopCowAbduction;
};

export default useCowAnimations;
