import styles from './Terminal.module.scss';
import Command from './command/Command';
import { useState } from 'react';

export default function Terminal() {
  const [isCommandVisible, setIsCommandVisible] = useState(false);
  const onClick = () => {
    setIsCommandVisible((state) => !state);
  };

  return (
    <div className={styles.terminal}>
      <img
        className={styles.terminal__image}
        src="/static/images/terminal.svg"
        alt="terminal image"
      />
      <div className={styles.terminal__text}>{isCommandVisible && <Command command="HOME_NAME" />}</div>
      <button
        style={{ position: 'absolute', zIndex: 5 }}
        onClick={onClick}
      >
        CLICK
      </button>
    </div>
  );
}
