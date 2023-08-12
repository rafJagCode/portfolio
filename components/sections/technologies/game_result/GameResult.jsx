import styles from './GameResult.module.scss';
import { gameStates, compareGameState } from 'redux/game/gameStateMachine';

export default function GameResult({ gameState }) {
  return (
    <div className={styles.container} data-game-state={gameState}>
      {compareGameState(gameState, gameStates.GAME_WON) ? 'GAME_WON_MESSAGE' : 'GAME_LOST_MESSAGE'}
    </div>
  );
}
