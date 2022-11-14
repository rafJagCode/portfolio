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
  const abductionInProgress = useRef(false);

  const stopAbductingCow = async () => {
    flyToCowAnimationRef.current.stopAnimation();
    liftCowUpAnimationRef.current.stopAnimation();
    await putCowDownAnimationRef.current.startAnimation();
    beamAnimationRef.current.stopAnimation();
    hoveOverCowAnimationRef.current.stopAnimation();
    abductionInProgress.current = false;
  };

  const startAbductingCow = async () => {
    abductionInProgress.current = true;
    holdLaunchingPositionAnimationRef.current.stopAnimation();
    const flyStatus = await flyToCowAnimationRef.current.startAnimation();
    if (flyStatus === 'FLY_ABORTED') {
      abductionInProgress.current = false;
      return;
    }
    hoveOverCowAnimationRef.current.startAnimation();
    beamAnimationRef.current.startAnimation();
    const liftingStatus = await liftCowUpAnimationRef.current.startAnimation();
    if (liftingStatus === 'LIFTING_FINISHED') showProjectDetails();
  };

  const handleCowAbduction = async () => {
    if (isAbductionInProgress()) await stopAbductingCow();
    if (noCowSelected()) return;
    cowHelper.setCow(clickedCowRef);
    startAbductingCow(clickedCowRef);
  };

  const showProjectDetails = () => {
    const project = clickedCowRef.current.dataset.project;
    dispatch({ type: 'QUEUE_COMMAND', command: `COMMAND_CD_${project}`, directory: project });
    dispatch({ type: 'QUEUE_COMMAND', command: `clear`, directory: project });
    dispatch({ type: 'QUEUE_COMMAND', command: `COMMAND_CAT_PROJECT_DESCRIPTION`, print: `PRINT_PROJECT_${project}`, directory: project });
  };

  const noCowSelected = () => {
    if (!clickedCowRef) return true;
    return false;
  };

  const isAbductionInProgress = () => {
    if (abductionInProgress.current) return true;
    return false;
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
    handleCowAbduction();
  }, [cowHelper, flyToCowAnimationRef, beamAnimationRef, clickedCowRef]);
};

export default useAnimations;
