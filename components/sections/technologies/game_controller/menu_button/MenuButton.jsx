import styles from './MenuButton.module.scss';
import actions from 'redux/actions';
import useTranslation from 'translation/useTranslation';
import { useDispatch } from 'react-redux';

export default function MenuButton({ text, action, active }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <button className={styles.container} data-is-active={active} onClick={() => dispatch(actions.updateGameState(action))}>
      {t(text)}
    </button>
  );
}
