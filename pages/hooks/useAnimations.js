import OrbitingAnimation from '@/components/ufo/animations/OrbitingAnimation';
import EngineAnimation from '@/components/ufo/animations/EngineAnimation';
import HoldLaunchingPositionAnimation from '@/components/ufo/animations/HoldLaunchingPositionAnimation';
import FlyToCowAnimation from '@/components/ufo/animations/FlyToCowAnimation';
import HoverOverCowAnimation from '@/components/ufo/animations/HoverOverCowAnimation';
import LiftCowUpAnimation from '@/components/sections/projects/cow/animations/LiftCowUpAnimation';
import BeamAnimation from '@/components/ufo/animations/BeamAnimation';
import FlyToLaunchingPositionAnimation from '@/components/ufo/animations/FlyToLaunchingPositionAnimation';
import UfoSteeringAnimation from '@/components/ufo/animations/UfoSteeringAnimation';
import { refsTypes } from '@/configuration/types';
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
  initialiseAnimation(UfoSteeringAnimation, { ufoRef: ufoRef }, dispatch);
};

export default useAnimations;
