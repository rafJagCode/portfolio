import { gameStates, compareGameState } from 'redux/game/gameStateMachine';
import { refsTypes } from '@/configuration/types_conf';
import Timer from '@/utils/helper_functions/Timer';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

const useUfoImmunity = () => {
  const immuneDuration = 5000;
  const gameState = useSelector((state) => state.gameState);
  const ufoHits = useSelector((state) => state.ufoHits);
  const ufoRef = useSelector((state) => state.globalRefs[refsTypes.UFO_REF]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!ufoHits.length) return;
    timerRef.current = new Timer(() => {
      ufoRef.current.dataset.isImmune = false;
      timerRef.current = null;
    }, immuneDuration);
    timerRef.current.start();
  }, [ufoHits]);

  useEffect(() => {
    if (!timerRef.current) return;
    if (compareGameState(gameState, gameStates.GAME_PAUSED)) timerRef.current.pause();
    if (compareGameState(gameState, gameStates.PLAYING)) timerRef.current.resume();
    if (compareGameState(gameState, gameStates.GAME_ENDED) || compareGameState(gameState, gameStates.GAME_LOST) || compareGameState(gameState, gameStates.GAME_WON)) {
      timerRef.current.clear();
      ufoRef.current.dataset.isImmune = false;
    }
  }, [gameState]);
};

export default useUfoImmunity;
