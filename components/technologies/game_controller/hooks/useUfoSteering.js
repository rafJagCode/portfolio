import { animationsTypes } from '@/types';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const useUfoSteering = () => {
  const gameState = useSelector((state) => state.gameState);
  const holdLaunchingPositionAnimation = useSelector((state) => state.animations[animationsTypes.HOLD_LAUNCHING_POSITION_ANIMATION]);
  const flyToLaunchingPositionAnimation = useSelector((state) => state.animations[animationsTypes.FLY_TO_LAUNCHING_POSITION_ANIMATION]);
  const ufoSteeringAnimation = useSelector((state) => state.animations[animationsTypes.UFO_STEERING_ANIMATION]);
  const keys = useSelector((state) => state.keys);

  const enableUfoSteering = () => {
    holdLaunchingPositionAnimation.stopAnimation();
    ufoSteeringAnimation.startAnimation();
  };

  const disableUfoSteering = () => {
    ufoSteeringAnimation.stopAnimation();
  };

  const flyToLaunchingPosition = async () => {
    await flyToLaunchingPositionAnimation.startAnimation();
    holdLaunchingPositionAnimation.startAnimation();
  };

  useEffect(() => {
    if (!holdLaunchingPositionAnimation || !ufoSteeringAnimation || !flyToLaunchingPositionAnimation) return;
    if (gameState === 'STARTED') {
      enableUfoSteering();
      return;
    }
    if (gameState === 'FINISHED') flyToLaunchingPosition();
    disableUfoSteering();
  }, [gameState, holdLaunchingPositionAnimation, ufoSteeringAnimation, flyToLaunchingPositionAnimation]);

  useEffect(() => {
    if (!ufoSteeringAnimation) return;
    ufoSteeringAnimation.setKeys(keys);
  }, [keys, ufoSteeringAnimation]);
};

export default useUfoSteering;
