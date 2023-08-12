import styles from './UfoHealthbar.module.scss';
import useUfoLives from './hooks/useUfoLives';
import UfoLife from './ufo_life/UfoLife';
import { gameStates, compareGameState } from 'redux/game/gameStateMachine';
import { useSelector } from 'react-redux';

export default function UfoHealthbar() {
  const gameState = useSelector((state) => state.gameState);
  const currentLives = useUfoLives();

  if (!compareGameState(gameState, gameStates.PLAYING)) return null;

  return <div className={styles.container}>{currentLives ? currentLives.map((life) => <UfoLife key={`ufo_life_${life.index}`} lifeState={life.state} />) : null}</div>;
}
