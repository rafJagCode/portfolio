import styles from './Technologies.module.scss';
import GameResult from './game_result/GameResult';
import Crosshair from './crosshair/Crosshair';
import TechnologiesBar from './technologies_bar/TechnologiesBar';
import GameController from './game_controller/GameController';
import Lasers from './lasers/Lasers';
import Explosion from './explosion/Explosion';
import Asteroid from './asteroid/Asteroid';
import Technology from './technology/Technology';
import useAsteroids from './hooks/useAsteroids';
import useExplosions from './hooks/useExplosions';
import useTechnologies from './hooks/useTechnologies';
import { gameStates, gameActions, compareGameState } from 'redux/game/gameStateMachine';
import actions from 'redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function Technologies() {
  const dispatch = useDispatch();
  const [asteroids, addAsteroid, removeAsteroid] = useAsteroids();
  const [explosions, removeExplosion] = useExplosions();
  const [technologies, addTechnology, removeTechnology] = useTechnologies();
  const gameState = useSelector((state) => state.gameState);

  useEffect(() => {
    if (compareGameState(gameState, gameStates.PLAYING) && asteroids.length === 0) dispatch(actions.updateGameState(gameActions.WIN_GAME));
  }, [asteroids]);

  return (
    <div className={styles.container}>
      {compareGameState(gameState, gameStates.GAME_WON) ? <GameResult gameState={gameState} /> : null}
      {compareGameState(gameState, gameStates.GAME_LOST) ? <GameResult gameState={gameState} /> : null}
      {compareGameState(gameState, gameStates.PLAYING) ? <Crosshair /> : null}
      <TechnologiesBar />
      <GameController />
      <Lasers />
      {explosions.map((explosion) => {
        return <Explosion key={explosion.explosionID} explosion={explosion} removeExplosion={removeExplosion} />;
      })}
      {asteroids.map((asteroid) => {
        return <Asteroid key={asteroid.asteroidID} asteroid={asteroid} removeAsteroid={removeAsteroid} addAsteroid={addAsteroid} addTechnology={addTechnology} />;
      })}
      {technologies.map((technology) => (
        <Technology key={technology.name} name={technology.name} startingPosition={technology.startingPosition} removeTechnology={removeTechnology} />
      ))}
    </div>
  );
}
