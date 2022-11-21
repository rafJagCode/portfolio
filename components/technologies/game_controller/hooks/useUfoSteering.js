import { animationsTypes } from '@/types';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const useUfoSteering = () => {
  const gameState = useSelector((state) => state.gameState);
  const holdLaunchingPositionAnimation = useSelector((state) => state.animations[animationsTypes.HOLD_LAUNCHING_POSITION_ANIMATION]);
  const ufoSteeringAnimation = useSelector((state) => state.animations[animationsTypes.UFO_STEERING_ANIMATION]);
  const keys = useSelector((state) => state.keys);

  const enableUfoSteering = () => {
    holdLaunchingPositionAnimation.stopAnimation();
    ufoSteeringAnimation.startAnimation();
  };

  const disableUfoSteering = () => {
    ufoSteeringAnimation.stopAnimation();
  };

  useEffect(() => {
    if (!holdLaunchingPositionAnimation || !ufoSteeringAnimation) return;
    if (gameState === 'STARTED') {
      enableUfoSteering();
      return;
    }
    disableUfoSteering();
  }, [gameState, holdLaunchingPositionAnimation, ufoSteeringAnimation]);

  useEffect(() => {
    if (!ufoSteeringAnimation) return;
    ufoSteeringAnimation.setKeys(keys);
  }, [keys, ufoSteeringAnimation]);
};

export default useUfoSteering;
