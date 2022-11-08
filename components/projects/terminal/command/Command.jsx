import StartingLine from './StartingLine';
import useTranslation from '@/hooks/useTranslation';
import TypingAnimation from '../animations/TypingAnimation';
import { useState, useEffect } from 'react';

export default function Command({ command }) {
  const { t } = useTranslation();
  const [typed, setTyped] = useState('');
  const [isTypingFinished, setIsTypingFinished] = useState(false);

  useEffect(() => {
    new TypingAnimation()
      .setTextToType(t(command))
      .type(setTyped)
      .then(() => {
        setIsTypingFinished(true);
      });
  }, []);

  return (
    <div className="command">
      <StartingLine />
      {isTypingFinished ? [t(command), <br></br>, <StartingLine />] : typed}
    </div>
  );
}
