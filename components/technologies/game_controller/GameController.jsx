import styles from './GameController.module.scss';
import availableKeys from '@/configuration/available_keys';
import useUfoSteering from './hooks/useUfoSteering';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';

export default function GameController() {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.gameState);
  useUfoSteering();

  const handleKeyStateChange = useCallback((e) => {
    if (!availableKeys.includes(e.key)) return;
    if (e.repeat) return;
    dispatch({ type: 'UPDATE_KEY_STATE', key: e.key });
  }, []);

  const changeGameState = (gameState) => {
    dispatch({ type: 'SET_GAME_STATE', gameState: gameState });
  };

  useEffect(() => {
    if (gameState === 'STARTED') {
      fullpage_api.setAllowScrolling(false);
      fullpage_api.setKeyboardScrolling(false);
      dispatch({ type: 'CHANGE_NAVIGATION_VISIBILITY', visible: false });
      addEventListener('keydown', handleKeyStateChange);
      addEventListener('keyup', handleKeyStateChange);
      return;
    }
    if (gameState === 'FINISHED') {
      fullpage_api.setAllowScrolling(true);
      fullpage_api.setKeyboardScrolling(true);
      dispatch({ type: 'CHANGE_NAVIGATION_VISIBILITY', visible: true });
    }
    removeEventListener('keydown', handleKeyStateChange);
    removeEventListener('keyup', handleKeyStateChange);
  }, [gameState]);

  return (
    <div className={styles.game_controller}>
      {gameState !== 'STARTED' && <button onClick={() => changeGameState('STARTED')}>START GAME</button>}
      {gameState !== 'FINISHED' && <button onClick={() => changeGameState('FINISHED')}>END GAME</button>}
      {gameState === 'STARTED' && <button onClick={() => changeGameState('PAUSED')}>PAUSE</button>}
    </div>
  );
}
