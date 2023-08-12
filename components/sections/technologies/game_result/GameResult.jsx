import styles from './GameResult.module.scss';

export default function GameResult({ gameState }) {
  return (
    <div className={styles.container} data-game-state={gameState}>
      {gameState === 'GAME_WON' ? 'GAME_WON_MESSAGE' : 'GAME_LOST_MESSAGE'}
    </div>
  );
}
