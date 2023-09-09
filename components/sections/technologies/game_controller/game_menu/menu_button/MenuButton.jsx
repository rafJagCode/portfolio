import styles from './MenuButton.module.scss';
import actions from 'redux/actions';
import useTranslation from 'translation/useTranslation';
import { useDispatch } from 'react-redux';

export default function MenuButton({ button }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <button className={styles.container} data-is-active={button.active} onClick={() => dispatch(actions.updateGameState(button.action))} tabIndex={button.tabIndex}>
      {t(button.text)}
    </button>
  );
}
