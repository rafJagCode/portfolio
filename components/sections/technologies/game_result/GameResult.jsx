import styles from './GameResult.module.scss';
import { gameStates, compareGameState } from 'redux/game/gameStateMachine';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';

export default function GameResult() {
  const gameState = useSelector((state) => state.gameState);
  const language = useSelector((state) => state.language);

  const getImage = useCallback(() => {
    return `/static/images/game_results/${gameState}-${language}.svg`;
  }, [language, gameState]);

  if (!compareGameState(gameState, gameStates.GAME_WON) && !compareGameState(gameState, gameStates.GAME_LOST)) return null;

  return <img className={styles.image} src={getImage()} />;
}
