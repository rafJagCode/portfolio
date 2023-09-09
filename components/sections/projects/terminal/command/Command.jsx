import StartingLine from '../starting_line/StartingLine';
import ProjectLinks from '../project_links/ProjectLinks';
import TypingAnimation from '../animations/TypingAnimation';
import useTranslation from '@/translation/useTranslation';
import { useState, useEffect } from 'react';

export default function Command({ command, setIsTerminalBusy }) {
  const { t } = useTranslation();
  const [typed, setTyped] = useState('');
  const [isTypingFinished, setIsTypingFinished] = useState(false);

  useEffect(() => {
    setIsTerminalBusy(true);
    const typingAnimation = new TypingAnimation();

    typingAnimation
      .setTextToType(t(command.text))
      .type(setTyped)
      .then(() => {
        command.resolve();
        setIsTypingFinished(true);
        setIsTerminalBusy(false);
      });

    return () => {
      typingAnimation.stop();
      setIsTerminalBusy(false);
    };
  }, []);

  const getCommandResult = () => {
    if (!isTypingFinished) return null;
    if (command.text === 'clear') return null;
    return (
      <>
        <br></br>
        {t(command.print)}
        {!command.project ? null : <ProjectLinks project={command.project} />}
        <br></br>
        <StartingLine />
      </>
    );
  };

  return (
    <span className='command'>
      {isTypingFinished ? t(command.text) : typed}
      {getCommandResult()}
    </span>
  );
}
