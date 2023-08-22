import availableKeys from '@/configuration/available_keys_conf';
import { gameStates, compareGameState } from 'redux/game/gameStateMachine';
import actions from 'redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';

const useKeyboard = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.gameState);

  const handleKeyStateChange = useCallback((e) => {
    if (!availableKeys.includes(e.key)) return;
    if (e.repeat) return;
    const pressed = e.type === 'keydown';
    dispatch(actions.updateKeyState(e.key, pressed));
  }, []);

  useEffect(() => {
    if (compareGameState(gameState, gameStates.PLAYING)) {
      addEventListener('keydown', handleKeyStateChange);
      addEventListener('keyup', handleKeyStateChange);
    } else {
      removeEventListener('keydown', handleKeyStateChange);
      removeEventListener('keyup', handleKeyStateChange);
    }
    return () => {
      removeEventListener('keydown', handleKeyStateChange);
      removeEventListener('keyup', handleKeyStateChange);
    };
  }, [gameState]);
};

export default useKeyboard;
