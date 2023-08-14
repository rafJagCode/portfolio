import styles from './Instructions.module.scss';
import Key from './key/Key';
import { gameStates, compareGameState } from 'redux/game/gameStateMachine';
import { useSelector } from 'react-redux';

export default function Instructions() {
  const gameState = useSelector((state) => state.gameState);
  const keys = [
    { name: 'spacebar', description: 'CLICK SPACEBAR TO SHOOT' },
    { name: 'move', description: 'STEER USING WASD KEYS' },
    { name: 'aim', description: 'USE ARROWS TO AIM' },
  ];

  return (
    <div className={styles.container} data-is-visible={!compareGameState(gameState, gameStates.PLAYING)}>
      {keys.map((key) => (
        <Key key={key.name} keyName={key.name} keyDescription={key.description} />
      ))}
    </div>
  );
}
