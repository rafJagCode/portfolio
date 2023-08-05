import styles from './Technologies.module.scss';
import GameController from './game_controller/GameController';
import Crosshair from './crosshair/Crosshair';
import Lasers from './lasers/Lasers';
import Explosion from './explosion/Explosion';
import Asteroid from './asteroid/Asteroid';
import useAsteroids from './hooks/useAsteroids';
import useExplosions from './hooks/useExplosions';
import useTechnologies from './hooks/useTechnologies';
import Technology from './technology/Technology';
import TechnologiesBar from './technologies_bar/TechnologiesBar';
import { useSelector } from 'react-redux';

export default function Technologies() {
  const [asteroids, addAsteroid, removeAsteroid] = useAsteroids();
  const [explosions, removeExplosion] = useExplosions();
  const [technologies, addTechnology, removeTechnology] = useTechnologies();
  const gameState = useSelector((state) => state.gameState);

  return (
    <div className={styles.container}>
      {gameState === 'STARTED' && <Crosshair />}
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
