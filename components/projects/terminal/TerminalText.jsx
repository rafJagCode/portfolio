import styles from './TerminalText.module.scss';
import Command from './command/Command';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

export default function TerminalText() {
  const commands = useSelector((state) => state.terminal.display);
  const terminalTextRef = useRef();
  const [scrollHeight, setScrollHeight] = useState(null);

  const scrollToBottom = (ref) => {
    ref.current.scrollTop = ref.current.scrollHeight;
  };

  useEffect(() => {
    if (!terminalTextRef) return;
    if (terminalTextRef.current.offsetHeight === terminalTextRef.current.scrollHeight) return;
    if (terminalTextRef.current.scrollHeight !== scrollHeight) setScrollHeight(terminalTextRef.current.scrollHeight);
  });

  useEffect(() => {
    if (!scrollHeight) return;
    scrollToBottom(terminalTextRef);
  }, [scrollHeight]);

  return (
    <div
      className={styles.terminal_text}
      id="terminal__text"
      ref={terminalTextRef}
    >
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
  );
}
