import styles from './TerminalText.module.scss';
import StartingLine from '../starting_line/StartingLine';
import Caret from '../caret/Caret';
import Command from '../command/Command';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

export default function TerminalText() {
  const commands = useSelector((state) => state.terminal.display);
  const terminalTextRef = useRef();
  const [scrollHeight, setScrollHeight] = useState(null);
  const [isTerminalBusy, setIsTerminalBusy] = useState(false);

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
    <div className={styles.container} id='terminal__text' ref={terminalTextRef}>
      <StartingLine />
      {commands.map((command, index) => {
        return <Command command={command} setIsTerminalBusy={setIsTerminalBusy} key={command + index} />;
      })}
      <Caret shouldBlink={!isTerminalBusy} />
    </div>
  );
}
