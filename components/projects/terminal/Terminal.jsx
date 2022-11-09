import styles from './Terminal.module.scss';
import Command from './command/Command';
import { useSelector, useDispatch } from 'react-redux';

export default function Terminal() {
  const dispatch = useDispatch();
  const commands = useSelector((state) => state.terminal.display);
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
      <div className={styles.terminal__text}>
        {commands.map((command, index) => {
          return (
            <Command
              command={command.text}
              resolve={command.resolve}
              key={command + index}
            />
          );
        })}
      </div>
      <button
        style={{ position: 'absolute', zIndex: 5 }}
        onClick={onClick}
      >
        CLICK
      </button>
    </div>
  );
}
