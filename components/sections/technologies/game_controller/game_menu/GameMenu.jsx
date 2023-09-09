import styles from './GameMenu.module.scss';
import MenuButton from './menu_button/MenuButton';
import { gameStates, gameActions, compareGameState } from 'redux/game/gameStateMachine';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function GameMenu() {
  const gameState = useSelector((state) => state.gameState);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    setMenu([
      {
        //force prettier break
        text: 'GAME_MENU_START_BUTTON',
        action: gameActions.START_GAME,
        active: compareGameState(gameState, gameStates.INITIAL_STATE) || compareGameState(gameState, gameStates.GAME_PAUSED) || compareGameState(gameState, gameStates.GAME_ENDED),
        tabIndex: '8',
      },
      { text: 'GAME_MENU_PAUSE_BUTTON', action: gameActions.PAUSE_GAME, active: compareGameState(gameState, gameStates.PLAYING), tabIndex: '9' },
      { text: 'GAME_MENU_END_BUTTON', action: gameActions.END_GAME, active: !compareGameState(gameState, gameStates.GAME_ENDED) && !compareGameState(gameState, gameStates.INITIAL_STATE), tabIndex: '10' },
    ]);
  }, [gameState]);

  return (
    <div className={styles.container}>
      {menu.map((button) => (
        <MenuButton key={button.text} button={button} />
      ))}
    </div>
  );
}
