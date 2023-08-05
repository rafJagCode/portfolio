import styles from './GameController.module.scss';
import Instructions from '../instructions/Instructions';
import availableKeys from '@/configuration/available_keys';
import useUfoSteering from './hooks/useUfoSteering';
import types from 'redux/types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';

export default function GameController() {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.gameState);
  useUfoSteering();

  const handleKeyStateChange = useCallback((e) => {
    if (!availableKeys.includes(e.key)) return;
    if (e.repeat) return;
    dispatch({ type: types.UPDATE_KEY_STATE, key: e.key });
  }, []);

  const changeGameState = (gameState) => {
    dispatch({ type: types.SET_GAME_STATE, gameState: gameState });
  };

  useEffect(() => {
    if (gameState === 'STARTED') {
      fullpage_api.setAllowScrolling(false);
      fullpage_api.setKeyboardScrolling(false);
      dispatch({ type: types.CHANGE_NAVIGATION_VISIBILITY, visible: false });
      addEventListener('keydown', handleKeyStateChange);
      addEventListener('keyup', handleKeyStateChange);
      return;
    }
    if (gameState === 'FINISHED') {
      fullpage_api.setAllowScrolling(true);
      fullpage_api.setKeyboardScrolling(true);
      dispatch({ type: types.CHANGE_NAVIGATION_VISIBILITY, visible: true });
    }
    removeEventListener('keydown', handleKeyStateChange);
    removeEventListener('keyup', handleKeyStateChange);
  }, [gameState]);

  return (
    <div className={styles.container}>
      {gameState !== 'STARTED' && <Instructions />}
      {gameState !== 'STARTED' && (
        <button className={styles.button} onClick={() => changeGameState('STARTED')}>
          START GAME
        </button>
      )}
      {gameState !== 'FINISHED' && (
        <button className={styles.button} onClick={() => changeGameState('FINISHED')}>
          END GAME
        </button>
      )}
      {gameState === 'STARTED' && (
        <button className={styles.button} onClick={() => changeGameState('PAUSED')}>
          PAUSE
        </button>
      )}
    </div>
  );
}
