import styles from './KeyboardController.module.scss';
import Key from './key/Key';
import { gameStates, compareGameState } from 'redux/game/gameStateMachine';
import useKeyboard from './hooks/useKeyboard';
import { useSelector } from 'react-redux';

export default function KeyboardController() {
  useKeyboard();
  const gameState = useSelector((state) => state.gameState);
  const keys = [
    { name: 'spacebar', description: 'GAME_SPACEBAR_KEY_INSTRUCTION' },
    { name: 'move', description: 'GAME_WASD_KEYS_INSTRUCTION' },
    { name: 'aim', description: 'GAME_ARROWS_KEYS_INSTRUCTION' },
  ];

  return (
    <div className={styles.container} data-is-visible={!compareGameState(gameState, gameStates.PLAYING)}>
      {keys.map((key) => (
        <Key key={key.name} properties={key} />
      ))}
    </div>
  );
}
