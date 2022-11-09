import StartingLine from './StartingLine';
import useTranslation from '@/hooks/useTranslation';
import TypingAnimation from '../animations/TypingAnimation';
import { useState, useEffect } from 'react';

export default function Command({ command, resolve }) {
  const { t } = useTranslation();
  const [typed, setTyped] = useState('');
  const [isTypingFinished, setIsTypingFinished] = useState(false);

  useEffect(() => {
    if (command === 'EMPTY') return;
    new TypingAnimation()
      .setTextToType(t(command))
      .type(setTyped)
      .then(() => {
        setIsTypingFinished(true);
        resolve();
      });
  }, []);

  return (
    <div className="command">
      <StartingLine />
      {command !== 'EMPTY' && isTypingFinished ? t(command) : typed}
    </div>
  );
}
