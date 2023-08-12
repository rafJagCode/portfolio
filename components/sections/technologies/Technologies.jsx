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
    if (gameState === 'STARTED' && asteroids.length === 0) dispatch(actions.setGameState('GAME_WON'));
  }, [asteroids]);

  return (
    <div className={styles.container}>
      {gameState === 'GAME_WON' || gameState === 'GAME_LOST' ? <GameResult gameState={gameState} /> : null}
      {gameState === 'STARTED' ? <Crosshair /> : null}
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
