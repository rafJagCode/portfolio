import AsteroidAnimation from '../animations/AsteroidAnimation';
import { refsTypes } from '@/configuration/types';
import { gameStates, compareGameState } from 'redux/game/gameStateMachine';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';

const useAsteroidAnimation = (startingSpeed, asteroidRef) => {
  const ufoRef = useSelector((state) => state.globalRefs[refsTypes.UFO_REF]);
  const gameState = useSelector((state) => state.gameState);
  const dispatch = useDispatch();
  const asteroidAnimationRef = useRef(null);

  useEffect(() => {
    if (!asteroidRef || !ufoRef) return;
    asteroidAnimationRef.current = new AsteroidAnimation(startingSpeed, asteroidRef, ufoRef, dispatch);
    return () => {
      asteroidAnimationRef.current.stop();
    };
  }, [asteroidRef, ufoRef]);

  useEffect(() => {
    if (!asteroidAnimationRef.current) return;
    if (compareGameState(gameState, gameStates.PLAYING)) asteroidAnimationRef.current.start();
    else asteroidAnimationRef.current.stop();
  }, [gameState]);
};

export default useAsteroidAnimation;
