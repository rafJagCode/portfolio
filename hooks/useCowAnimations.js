import { useDispatch, useSelector } from 'react-redux';

const useCowAnimations = () => {
  const dispatch = useDispatch();
  const flyToCowAnimation = useSelector((state) => state.animations.FLY_TO_COW_ANIMATION);
  const putCowDownAnimation = useSelector((state) => state.animations.PUT_COW_DOWN_ANIMATION);
  const beamAnimation = useSelector((state) => state.animations.BEAM_ANIMATION);
  const hoveOverCowAnimation = useSelector((state) => state.animations.HOVER_OVER_COW_ANIMATION);
  const flyToLaunchingPositionAnimation = useSelector((state) => state.animations.FLY_TO_LAUNCHING_POSITION_ANIMATION);
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
