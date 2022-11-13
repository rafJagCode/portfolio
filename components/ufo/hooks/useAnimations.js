import OrbitingAnimation from '../animations/OrbitingAnimation';
import EngineAnimation from '../animations/EngineAnimation';
import BeamAnimation from '../animations/BeamAnimation';
import FlyToCowAnimation from '../animations/FlyToCowAnimation';
import HoverOverCow from '../animations/HoverOverCowAnimation';
import LiftCowUpAnimation from '../animations/LiftCowUpAnimation';
import PutCowDownAnimation from '../animations/PutCowDownAnimation';
import FlyToLaunchingPosition from '../animations/FlyToLaunchingPositionAnimation';
import HoldLaunchingPositionAnimation from '../animations/HoldLaunchingPositionAnimation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

const useAnimations = (ufoHelper, flyingHelper, earthHelper, engineHelper, beamHelper, cowHelper) => {
  const clickedCowRef = useSelector((state) => state.clickedCowRef);
  const [beamAnimationRef, flyToCowAnimationRef, hoveOverCowAnimationRef, liftCowUpAnimationRef, putCowDownAnimationRef, flyToLaunchingPositionRef, holdLaunchingPositionAnimationRef] = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const dispatch = useDispatch();

  const stopAbductingCow = async () => {
    flyToCowAnimationRef.current.stopAnimation();
    await putCowDownAnimationRef.current.startAnimation();
    beamAnimationRef.current.stopAnimation();
    hoveOverCowAnimationRef.current.stopAnimation();
  };

  const startAbductingCow = async () => {
    holdLaunchingPositionAnimationRef.current.stopAnimation();
    const flyStatus = await flyToCowAnimationRef.current.startAnimation();
    if (flyStatus === 'FLY_ABORTED') return;
    hoveOverCowAnimationRef.current.startAnimation();
    beamAnimationRef.current.startAnimation();
    liftCowUpAnimationRef.current.startAnimation();
  };

  const handleCowAbduction = async (clickedCowRef) => {
    if (!!cowHelper.getCow() && !!clickedCowRef) await stopAbductingCow();
    if (!clickedCowRef) return;
    cowHelper.setCow(clickedCowRef);
    startAbductingCow();
  };

  useEffect(() => {
    if (!ufoHelper || !flyingHelper || !earthHelper) return;
    const orbitingAnimation = new OrbitingAnimation(dispatch, ufoHelper, flyingHelper, earthHelper);
    orbitingAnimation.startAnimation();
  }, [ufoHelper, flyingHelper, earthHelper]);

  useEffect(() => {
    if (!engineHelper) return;
    new EngineAnimation(dispatch, engineHelper);
  }, [engineHelper]);

  useEffect(() => {
    if (!beamHelper || !ufoHelper || !cowHelper) return;
    beamAnimationRef.current = new BeamAnimation(dispatch, beamHelper, ufoHelper, cowHelper);
  }, [beamHelper, ufoHelper, cowHelper]);

  useEffect(() => {
    if (!flyingHelper || !cowHelper) return;
    flyToCowAnimationRef.current = new FlyToCowAnimation(dispatch, flyingHelper, cowHelper);
    hoveOverCowAnimationRef.current = new HoverOverCow(dispatch, flyingHelper, cowHelper);
  }, [flyingHelper, cowHelper]);

  useEffect(() => {
    if (!cowHelper) return;
    liftCowUpAnimationRef.current = new LiftCowUpAnimation(dispatch, cowHelper);
    putCowDownAnimationRef.current = new PutCowDownAnimation(dispatch, cowHelper);
  }, [cowHelper]);

  useEffect(() => {
    if (!flyingHelper || !earthHelper) return;
    flyToLaunchingPositionRef.current = new FlyToLaunchingPosition(dispatch, flyingHelper, earthHelper);
    holdLaunchingPositionAnimationRef.current = new HoldLaunchingPositionAnimation(dispatch, flyingHelper, earthHelper);
  }, [flyingHelper, earthHelper]);

  useEffect(() => {
    if (!cowHelper || !flyToCowAnimationRef.current || !beamAnimationRef.current) return;
    handleCowAbduction(clickedCowRef);
  }, [cowHelper, flyToCowAnimationRef, beamAnimationRef, clickedCowRef]);
};

export default useAnimations;
