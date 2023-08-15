import styles from './AmmunitionBar.module.scss';
import { gameStates, compareGameState } from 'redux/game/gameStateMachine';
import { useSelector } from 'react-redux';

export default function AmmunitionBar() {
  const magazineCapacity = 5;
  const ammunition = useSelector((state) => state.ammunition);
  const gameState = useSelector((state) => state.gameState);

  if (!compareGameState(gameState, gameStates.PLAYING)) return null;

  return (
    <div className={styles.container}>
      {[...Array(magazineCapacity)].map((bullet, index) => (
        <img
          key={index} //force prettier break
          className={styles.bullet}
          src={`/static/images/bullet${index < magazineCapacity - ammunition ? '-empty' : ''}.svg`}
        />
      ))}
    </div>
  );
}
