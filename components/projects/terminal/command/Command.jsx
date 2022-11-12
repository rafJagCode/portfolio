import StartingLine from './StartingLine';
import useTranslation from '@/hooks/useTranslation';
import TypingAnimation from '../animations/TypingAnimation';
import { useState, useEffect } from 'react';

export default function Command({ command, resolve, print, directory, setIsTerminalBusy }) {
  const { t } = useTranslation();
  const [typed, setTyped] = useState('');
  const [isTypingFinished, setIsTypingFinished] = useState(false);

  useEffect(() => {
    if (command === 'EMPTY') return;
    setIsTerminalBusy(true);
    new TypingAnimation()
      .setTextToType(t(command))
      .type(setTyped)
      .then(() => {
        resolve();
        setIsTypingFinished(true);
        setIsTerminalBusy(false);
      });
  }, []);

  return (
    <span className="command">
      {command !== 'EMPTY' && isTypingFinished ? t(command) : typed}
      {isTypingFinished && <br></br>}
      {isTypingFinished && t(print)}
      {isTypingFinished && <br></br>}
      {isTypingFinished && <StartingLine directory={directory} />}
    </span>
  );
}
