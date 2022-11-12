import StartingLine from './StartingLine';
import useTranslation from '@/hooks/useTranslation';
import TypingAnimation from '../animations/TypingAnimation';
import { useState, useEffect } from 'react';

export default function Command({ command, resolve, print, directory, setIsTerminalBusy }) {
  const { t } = useTranslation();
  const [typed, setTyped] = useState('');
  const [isTypingFinished, setIsTypingFinished] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsTerminalBusy(true);
    const typingAnimation = new TypingAnimation();
    typingAnimation
      .setTextToType(t(command))
      .type(setTyped)
      .then(() => {
        resolve();
        if (isMounted) setIsTypingFinished(true);
        setIsTerminalBusy(false);
      });
    return () => {
      isMounted = false;
      typingAnimation.stop();
      setIsTerminalBusy(false);
    };
  }, []);

  return (
    <span className="command">
      {command !== 'EMPTY' && isTypingFinished ? t(command) : typed}
      {command !== 'clear' && isTypingFinished && <br></br>}
      {!!print && isTypingFinished && t(print)}
      {!!print && isTypingFinished && <br></br>}
      {command !== 'clear' && isTypingFinished && <StartingLine directory={directory} />}
    </span>
  );
}
