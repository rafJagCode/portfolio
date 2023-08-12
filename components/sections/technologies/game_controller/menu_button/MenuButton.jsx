import styles from './MenuButton.module.scss';
import actions from 'redux/actions';
import { useDispatch } from 'react-redux';

export default function MenuButton({ text, action }) {
  const dispatch = useDispatch();

  return (
    <button className={styles.container} onClick={() => dispatch(actions.updateGameState(action))}>
      {text}
    </button>
  );
}
