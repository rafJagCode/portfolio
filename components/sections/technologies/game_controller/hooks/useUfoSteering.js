import { animationsTypes } from '@/configuration/types_conf';
import { gameStates, compareGameState } from 'redux/game/gameStateMachine';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

const useUfoSteering = () => {
  const gameState = useSelector((state) => state.gameState);
  const holdLaunchingPositionAnimation = useSelector((state) => state.animations[animationsTypes.HOLD_LAUNCHING_POSITION_ANIMATION]);
  const flyToLaunchingPositionAnimation = useSelector((state) => state.animations[animationsTypes.FLY_TO_LAUNCHING_POSITION_ANIMATION]);
  const ufoSteeringAnimation = useSelector((state) => state.animations[animationsTypes.UFO_STEERING_ANIMATION]);
  const keys = useSelector((state) => state.keys);
  const ufoInPostitionPromise = useRef(null);

  const enableUfoSteering = async () => {
    await ufoInPostitionPromise.current;
    holdLaunchingPositionAnimation.stopAnimation();
    ufoSteeringAnimation.startAnimation();
  };

  const disableUfoSteering = () => {
    ufoSteeringAnimation.stopAnimation();
  };

  const flyToLaunchingPosition = async () => {
    await flyToLaunchingPositionAnimation.startAnimation();
    holdLaunchingPositionAnimation.startAnimation();
    return;
  };

  useEffect(() => {
    if (!holdLaunchingPositionAnimation || !ufoSteeringAnimation || !flyToLaunchingPositionAnimation) return;
    if (compareGameState(gameState, gameStates.GAME_ENDED)) ufoInPostitionPromise.current = flyToLaunchingPosition();
    if (compareGameState(gameState, gameStates.PLAYING)) enableUfoSteering();
    else disableUfoSteering();
  }, [gameState, holdLaunchingPositionAnimation, ufoSteeringAnimation, flyToLaunchingPositionAnimation]);

  useEffect(() => {
    if (!ufoSteeringAnimation) return;
    ufoSteeringAnimation.setKeys(keys);
  }, [keys, ufoSteeringAnimation]);
};

export default useUfoSteering;
