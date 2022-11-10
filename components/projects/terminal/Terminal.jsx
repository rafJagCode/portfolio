import styles from './Terminal.module.scss';
import TerminalText from './TerminalText';
import { useDispatch } from 'react-redux';

export default function Terminal() {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch({ type: 'QUEUE_COMMAND', command: 'HOME_NAME' });
  };

  return (
    <div className={styles.terminal}>
      <img
        className={styles.terminal__image}
        src="/static/images/terminal.svg"
        alt="terminal image"
      />
      <TerminalText />
      <button
        style={{ position: 'absolute', zIndex: 5 }}
        onClick={onClick}
      >
        CLICK
      </button>
    </div>
  );
}
