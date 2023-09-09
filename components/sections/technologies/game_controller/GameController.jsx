import styles from './GameController.module.scss';
import KeyboardController from './keyboard_controller/KeyboardController';
import TouchController from './touch_controller/TouchController';
import GameMenu from './game_menu/GameMenu';
import useUfoSteering from './hooks/useUfoSteering';
import useUfoImmunity from './hooks/useUfoImmunity';
import useTouchDetection from './hooks/useTouchDetection';
import { gameStates, gameActions, compareGameState } from 'redux/game/gameStateMachine';
import actions from 'redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function GameController() {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.gameState);
  const asteroids = useSelector((state) => state.asteroids);
  const ufoLives = useSelector((state) => state.ufoLives);
  const isTouchDevice = useTouchDetection();
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

  useEffect(() => {
    if (compareGameState(gameState, gameStates.PLAYING)) {
      fullpage_api.setAllowScrolling(false);
      fullpage_api.setKeyboardScrolling(false);
      dispatch(actions.changeNavigationVisibility(false));
      dispatch(actions.clearKeys());
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
  }, [gameState]);

  return (
    <div className={styles.container}>
      {isTouchDevice ? <TouchController /> : <KeyboardController />}
      <GameMenu />
    </div>
  );
}
