import styles from './GameResult.module.scss';
import { gameStates, compareGameState } from 'redux/game/gameStateMachine';
import { useSelector } from 'react-redux';

export default function GameResult() {
  const gameState = useSelector((state) => state.gameState);

  if (!compareGameState(gameState, gameStates.GAME_WON) && !compareGameState(gameState, gameStates.GAME_LOST)) return null;

  return (
    <div className={styles.container} data-game-state={gameState}>
      {compareGameState(gameState, gameStates.GAME_WON) ? 'GAME_WON_MESSAGE' : 'GAME_LOST_MESSAGE'}
    </div>
  );
}
