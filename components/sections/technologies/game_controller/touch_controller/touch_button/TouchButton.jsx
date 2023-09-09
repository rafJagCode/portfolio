import styles from './TouchButton.module.scss';
import actions from 'redux/actions';
import { gameStates, compareGameState } from 'redux/game/gameStateMachine';
import { useSelector, useDispatch } from 'react-redux';

export default function TouchButton({ button }) {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.gameState);

  const handleTouch = (e) => {
    if (!compareGameState(gameState, gameStates.PLAYING)) return;
    const pressed = e.type === 'touchstart';
    dispatch(actions.updateKeyState(button.key, pressed));
  };

  return (
    <button className={styles.container} style={{ gridArea: `${button.image}` }} onTouchStart={handleTouch} onTouchEnd={handleTouch} tabIndex='-1'>
      <img className={styles.image} src={`/static/images/touch_keys/touch-${button.image}.svg`}></img>
    </button>
  );
}
