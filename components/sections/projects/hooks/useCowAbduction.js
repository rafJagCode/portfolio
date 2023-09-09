import PutCowDownAnimation from '@/components/sections/projects/cow/animations/PutCowDownAnimation';
import { animationsTypes } from '@/configuration/types_conf';
import actions from 'redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

const useCowAbduction = () => {
  const dispatch = useDispatch();
  const [shouldAbduct, setShouldAbduct] = useState(false);
  const clickedCow = useSelector((state) => state.clickedCow);
  const holdLaunchingPositionAnimation = useSelector((state) => state.animations[animationsTypes.HOLD_LAUNCHING_POSITION_ANIMATION]);
  const flyToCowAnimation = useSelector((state) => state.animations[animationsTypes.FLY_TO_COW_ANIMATION]);
  const hoverOverCowAnimation = useSelector((state) => state.animations[animationsTypes.HOVER_OVER_COW_ANIMATION]);
  const beamAnimation = useSelector((state) => state.animations[animationsTypes.BEAM_ANIMATION]);
  const liftCowUpAnimation = useSelector((state) => state.animations[animationsTypes.LIFT_COW_UP_ANIMATION]);
  const flyToLaunchingPositionAnimation = useSelector((state) => state.animations[animationsTypes.FLY_TO_LAUNCHING_POSITION_ANIMATION]);

  const stopAbduction = (cow) => {
    beamAnimation.stopAnimation();
    new PutCowDownAnimation(cow).startAnimation();
    hoverOverCowAnimation.stopAnimation();
  };

  const leaveProjectsSection = () => {
    flyToCowAnimation.stopAnimation();
    flyToLaunchingPositionAnimation.startAnimation();
  };

  const flyToCow = async (cow) => {
    flyToCowAnimation.setCow(cow);
    const flyStatus = await flyToCowAnimation.startAnimation();
    setShouldAbduct(flyStatus === 'FLY_FINISHED');
  };

  const showProjectDetails = (project) => {
    dispatch(actions.queueCommand('clear'));
    dispatch(actions.queueCommand(`COMMAND_CAT_${project}`, `PRINT_PROJECT_${project}`, project));
  };

  const abductCow = async (cow) => {
    hoverOverCowAnimation.setCow(cow);
    hoverOverCowAnimation.startAnimation();
    beamAnimation.startAnimation();
    liftCowUpAnimation.setCow(cow);
    await liftCowUpAnimation.startAnimation();
    showProjectDetails(cow.toUpperCase());
  };

  useEffect(() => {
    if (!clickedCow.previous && !clickedCow.current) return;
    if (clickedCow.previous === clickedCow.current) return;
    if (!clickedCow.previous) holdLaunchingPositionAnimation.stopAnimation();
    if (clickedCow.previous) stopAbduction(clickedCow.previous);
    if (!clickedCow.current) return leaveProjectsSection();
    flyToCow(clickedCow.current);
  }, [clickedCow]);

  useEffect(() => {
    if (!shouldAbduct) return;
    setShouldAbduct(false);
    abductCow(clickedCow.current);
  }, [shouldAbduct]);
};

export default useCowAbduction;
