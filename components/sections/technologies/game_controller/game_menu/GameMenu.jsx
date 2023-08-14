import MenuButton from '../menu_button/MenuButton';
import { gameStates, gameActions, compareGameState } from 'redux/game/gameStateMachine';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function GameMenu() {
  const gameState = useSelector((state) => state.gameState);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    setMenu([
      { text: 'START GAME', action: gameActions.START_GAME, active: compareGameState(gameState, gameStates.INITIAL_STATE) || compareGameState(gameState, gameStates.GAME_PAUSED) || compareGameState(gameState, gameStates.GAME_ENDED) },
      { text: 'PAUSE GAME', action: gameActions.PAUSE_GAME, active: compareGameState(gameState, gameStates.PLAYING) },
      { text: 'END GAME', action: gameActions.END_GAME, active: !compareGameState(gameState, gameStates.GAME_ENDED) && !compareGameState(gameState, gameStates.INITIAL_STATE) },
    ]);
  }, [gameState]);

  return (
    <div>
      {menu.map((button) => (
        <MenuButton key={button.text} text={button.text} action={button.action} active={button.active} />
      ))}
    </div>
  );
}
