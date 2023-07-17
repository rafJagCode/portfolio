import OrbitingAnimation from '@/animations/OrbitingAnimation';
import EngineAnimation from '@/animations/EngineAnimation';
import HoldLaunchingPositionAnimation from '@/animations/HoldLaunchingPositionAnimation';
import { refsTypes } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const getRefs = () => {
  const ufoRef = useSelector((state) => state.globalRefs[refsTypes.UFO_REF]);
  const earthRef = useSelector((state) => state.globalRefs[refsTypes.EARTH_REF]);
  const engineRef = useSelector((state) => state.globalRefs[refsTypes.ENGINE_REF]);
  return { ufoRef, earthRef, engineRef };
};

const initialiseAnimation = (Animation, requiredRefs, dispatch) => {
  useEffect(() => {
    if (Object.values(requiredRefs).some((ref) => !ref)) return;
    new Animation(dispatch, requiredRefs);
  }, Object.values(requiredRefs));
};

const useAnimations = () => {
  const dispatch = useDispatch();
  const { ufoRef, earthRef, engineRef } = getRefs();
  initialiseAnimation(OrbitingAnimation, { ufoRef: ufoRef, earthRef: earthRef }, dispatch);
  initialiseAnimation(EngineAnimation, { engineRef: engineRef }, dispatch);
  initialiseAnimation(HoldLaunchingPositionAnimation, { ufoRef: ufoRef, earthRef: earthRef }, dispatch);
};

export default useAnimations;
