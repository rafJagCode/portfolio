import actions from 'redux/actions';
import { gameStates, gameActions, compareGameState } from 'redux/game/gameStateMachine';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const useAsteroids = () => {
  const asteroids = useSelector((state) => state.asteroids);
  const gameState = useSelector((state) => state.gameState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (compareGameState(gameState, gameStates.PLAYING) && !asteroids.length) dispatch(actions.updateGameState(gameActions.WIN_GAME));
  }, [asteroids]);

  const addAsteroid = (asteroid) => {
    dispatch(actions.addAsteroid(asteroid));
  };

  const removeAsteroid = (asteroidID) => {
    dispatch(actions.removeAsteroid(asteroidID));
  };

  return [asteroids, addAsteroid, removeAsteroid];
};

export default useAsteroids;
