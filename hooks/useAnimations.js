import OrbitingAnimation from '@/animations/OrbitingAnimation';
import EngineAnimation from '@/animations/EngineAnimation';
import HoldLaunchingPositionAnimation from '@/animations/HoldLaunchingPositionAnimation';
import FlyToCowAnimation from '@/animations/FlyToCowAnimation';
import HoverOverCowAnimation from '@/animations/HoverOverCowAnimation';
import LiftCowUpAnimation from '@/animations/LiftCowUpAnimation';
import BeamAnimation from '@/animations/BeamAnimation';
import FlyToLaunchingPositionAnimation from '@/animations/FlyToLaunchingPositionAnimation';
import { refsTypes } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const getRefs = () => {
  const ufoRef = useSelector((state) => state.globalRefs[refsTypes.UFO_REF]);
  const earthRef = useSelector((state) => state.globalRefs[refsTypes.EARTH_REF]);
  const engineRef = useSelector((state) => state.globalRefs[refsTypes.ENGINE_REF]);
  const beamRef = useSelector((state) => state.globalRefs[refsTypes.BEAM_REF]);
  return { ufoRef, earthRef, engineRef, beamRef };
};

const initialiseAnimation = (Animation, requiredRefs, dispatch) => {
  useEffect(() => {
    if (Object.values(requiredRefs).some((ref) => !ref)) return;
    new Animation(dispatch, requiredRefs);
  }, Object.values(requiredRefs));
};

const useAnimations = () => {
  const dispatch = useDispatch();
  const { ufoRef, earthRef, engineRef, beamRef } = getRefs();
  initialiseAnimation(OrbitingAnimation, { ufoRef: ufoRef, earthRef: earthRef }, dispatch);
  initialiseAnimation(EngineAnimation, { engineRef: engineRef }, dispatch);
  initialiseAnimation(BeamAnimation, { beamRef: beamRef }, dispatch);
  initialiseAnimation(HoldLaunchingPositionAnimation, { ufoRef: ufoRef, earthRef: earthRef }, dispatch);
  initialiseAnimation(FlyToCowAnimation, {}, dispatch);
  initialiseAnimation(HoverOverCowAnimation, {}, dispatch);
  initialiseAnimation(LiftCowUpAnimation, {}, dispatch);
  initialiseAnimation(FlyToLaunchingPositionAnimation, { ufoRef: ufoRef, earthRef: earthRef }, dispatch);
};

export default useAnimations;
