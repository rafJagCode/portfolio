import PutCowDownAnimation from '@/animations/PutCowDownAnimation';
import { animationsTypes } from '@/types';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const useCowAbduction = () => {
  const [shouldAbduct, setShouldAbduct] = useState(false);
  const clickedCow = useSelector((state) => state.clickedCow);
  const holdLaunchingPositionAnimation = useSelector((state) => state.animations[animationsTypes.HOLD_LAUNCHING_POSITION_ANIMATION]);
  const flyToCowAnimation = useSelector((state) => state.animations[animationsTypes.FLY_TO_COW_ANIMATION]);
  const hoverOverCowAnimation = useSelector((state) => state.animations[animationsTypes.HOVER_OVER_COW_ANIMATION]);
  const beamAnimation = useSelector((state) => state.animations[animationsTypes.BEAM_ANIMATION]);
  const liftCowUpAnimation = useSelector((state) => state.animations[animationsTypes.LIFT_COW_UP_ANIMATION]);
  const flyToLaunchingPositionAnimation = useSelector((state) => state.animations[animationsTypes.FLY_TO_LAUNCHING_POSITION_ANIMATION]);

  useEffect(() => {
    if (!clickedCow.previous && !clickedCow.current) return;
    if (clickedCow.previous === clickedCow.current) return;
    if (!clickedCow.previous) holdLaunchingPositionAnimation.stopAnimation();
    if (clickedCow.previous) {
      beamAnimation.stopAnimation();
      new PutCowDownAnimation(clickedCow.previous).startAnimation();
      hoverOverCowAnimation.stopAnimation();
    }
    if (!clickedCow.current) {
      flyToCowAnimation.stopAnimation();
      flyToLaunchingPositionAnimation.startAnimation();
      return;
    }

    const flyToCow = async () => {
      const flyStatus = await flyToCowAnimation.startAnimation();
      setShouldAbduct(flyStatus === 'FLY_FINISHED');
    };

    flyToCowAnimation.setCow(clickedCow.current);
    flyToCow();
  }, [clickedCow]);

  useEffect(() => {
    if (!shouldAbduct) return;
    setShouldAbduct(false);
    hoverOverCowAnimation.setCow(clickedCow.current);
    hoverOverCowAnimation.startAnimation();
    beamAnimation.startAnimation();
    liftCowUpAnimation.setCow(clickedCow.current);
    liftCowUpAnimation.startAnimation();
  }, [shouldAbduct]);
};

export default useCowAbduction;
