import styles from './GameController.module.scss';
import Instructions from '../instructions/Instructions';
import GameMenu from './game_menu/GameMenu';
import availableKeys from '@/configuration/available_keys_conf';
import useUfoSteering from './hooks/useUfoSteering';
import { gameStates, compareGameState } from 'redux/game/gameStateMachine';
import actions from 'redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';

export default function GameController() {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.gameState);
  useUfoSteering();

  const handleKeyStateChange = useCallback((e) => {
    if (!availableKeys.includes(e.key)) return;
    if (e.repeat) return;
    const pressed = e.type === 'keydown';
    dispatch(actions.updateKeyState(e.key, pressed));
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
      dispatch(actions.clearAsteroids());
      dispatch(actions.clearAsteroidsHits());
      dispatch(actions.clearUfoHits());
      dispatch(actions.clearTechnologies());
    }
    removeEventListener('keydown', handleKeyStateChange);
    removeEventListener('keyup', handleKeyStateChange);
  }, [gameState]);

  return (
    <div className={styles.container}>
      <Instructions />
      <GameMenu />
    </div>
  );
}
