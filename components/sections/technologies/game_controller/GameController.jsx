import styles from './GameController.module.scss';
import Instructions from './instructions/Instructions';
import GameMenu from './game_menu/GameMenu';
import availableKeys from '@/configuration/available_keys_conf';
import useUfoSteering from './hooks/useUfoSteering';
import useUfoImmunity from './hooks/useUfoImmunity';
import { gameStates, gameActions, compareGameState } from 'redux/game/gameStateMachine';
import actions from 'redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';

export default function GameController() {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.gameState);
  const asteroids = useSelector((state) => state.asteroids);
  const ufoLives = useSelector((state) => state.ufoLives);
  useUfoSteering();
  useUfoImmunity();

  const getFullLives = () => {
    return ufoLives.reduce((acc, curr) => (curr === 'full' ? acc + 1 : acc), 0);
  };

  useEffect(() => {
    if (!compareGameState(gameState, gameStates.PLAYING)) return;
    if (!getFullLives()) dispatch(actions.updateGameState(gameActions.LOSE_GAME));
  }, [ufoLives]);

  useEffect(() => {
    if (!compareGameState(gameState, gameStates.PLAYING)) return;
    if (!asteroids.length) dispatch(actions.updateGameState(gameActions.WIN_GAME));
  }, [asteroids]);

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
      dispatch(actions.clearKeys());
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
      dispatch(actions.reloadAmmunition());
      dispatch(actions.resetLives());
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
