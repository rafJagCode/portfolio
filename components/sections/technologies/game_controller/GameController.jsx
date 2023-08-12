import styles from './GameController.module.scss';
import MenuButton from './menu_button/MenuButton';
import Instructions from '../instructions/Instructions';
import availableKeys from '@/configuration/available_keys';
import useUfoSteering from './hooks/useUfoSteering';
import { gameStates, gameActions, compareGameState } from 'redux/game/gameStateMachine';
import actions from 'redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback, useState } from 'react';

export default function GameController() {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.gameState);
  const [menu, setMenu] = useState([]);
  useUfoSteering();

  const handleKeyStateChange = useCallback((e) => {
    if (!availableKeys.includes(e.key)) return;
    if (e.repeat) return;
    dispatch(actions.updateKeyState(e.key));
  }, []);

  useEffect(() => {
    if (compareGameState(gameState, gameStates.PLAYING)) {
      fullpage_api.setAllowScrolling(false);
      fullpage_api.setKeyboardScrolling(false);
      dispatch(actions.changeNavigationVisibility(false));
      addEventListener('keydown', handleKeyStateChange);
      addEventListener('keyup', handleKeyStateChange);
      return;
    }
    if (compareGameState(gameState, gameStates.GAME_ENDED)) {
      fullpage_api.setAllowScrolling(true);
      fullpage_api.setKeyboardScrolling(true);
      dispatch(actions.changeNavigationVisibility(true));
    }
    removeEventListener('keydown', handleKeyStateChange);
    removeEventListener('keyup', handleKeyStateChange);
  }, [gameState]);

  useEffect(() => {
    setMenu([
      { text: 'START GAME', action: gameActions.START_GAME, active: compareGameState(gameState, gameStates.INITIAL_STATE) || compareGameState(gameState, gameStates.GAME_PAUSED) },
      { text: 'PAUSE GAME', action: gameActions.PAUSE_GAME, active: compareGameState(gameState, gameStates.PLAYING) },
      { text: 'RESET GAME', action: gameActions.RESET_GAME, active: !compareGameState(gameState, gameStates.INITIAL_STATE) },
      { text: 'END GAME', action: gameActions.END_GAME, active: !compareGameState(gameState, gameStates.GAME_ENDED) && !compareGameState(gameState, gameStates.INITIAL_STATE) },
    ]);
  }, [gameState]);

  return (
    <div className={styles.container}>
      {!compareGameState(gameState, gameStates.PLAYING) ? <Instructions /> : null}
      {menu.map((button) => {
        return button.active ? <MenuButton key={button.text} text={button.text} action={button.action} /> : null;
      })}
    </div>
  );
}
