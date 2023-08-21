import styles from './Instructions.module.scss';
import Key from './key/Key';
import { gameStates, compareGameState } from 'redux/game/gameStateMachine';
import { useSelector } from 'react-redux';

export default function Instructions() {
  const gameState = useSelector((state) => state.gameState);
  const keys = [
    { name: 'spacebar', description: 'GAME_SPACEBAR_KEY_INSTRUCTION' },
    { name: 'move', description: 'GAME_WASD_KEYS_INSTRUCTION' },
    { name: 'aim', description: 'GAME_ARROWS_KEYS_INSTRUCTION' },
  ];

  return (
    <div className={styles.container} data-is-visible={!compareGameState(gameState, gameStates.PLAYING)}>
      {keys.map((key) => (
        <Key key={key.name} keyName={key.name} keyDescription={key.description} />
      ))}
    </div>
  );
}
