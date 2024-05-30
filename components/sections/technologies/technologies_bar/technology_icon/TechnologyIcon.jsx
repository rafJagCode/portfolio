import styles from './TechnologyIcon.module.scss';
import { gameStates, gameActions, compareGameState } from 'redux/game/gameStateMachine';
import actions from 'redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef, useEffect, useCallback } from 'react';
import useTranslation from '@/translation/useTranslation';

export default function TechnologyIcon({ technology, tabIndex }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.gameState);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef(null);

  const openPopover = () => {
    if (compareGameState(gameState, gameStates.PLAYING)) dispatch(actions.updateGameState(gameActions.PAUSE_GAME));
    setIsPopoverOpen(true);
  };

  const handleClickOutsidePopover = useCallback((e) => {
    if (!popoverRef.current.contains(e.target)) setIsPopoverOpen(false);
  }, []);

  const handleEscapeClick = useCallback((e) => {
    if (e.key === 'Escape') setIsPopoverOpen(false);
  }, []);

  useEffect(() => {
    if (isPopoverOpen) {
      addEventListener('click', handleClickOutsidePopover);
      addEventListener('keydown', handleEscapeClick);
    }

    return () => {
      removeEventListener('click', handleClickOutsidePopover);
      removeEventListener('keydown', handleEscapeClick);
    };
  }, [isPopoverOpen]);

  return (
    <button className={styles.button} onClick={openPopover} tabIndex={tabIndex}>
      {isPopoverOpen && (
        <div className={styles.popover} ref={popoverRef}>
          <p className={styles.popover_title}>{technology.name}</p>
          <p className={styles.popover_desc}>{t(`${technology.name.toUpperCase()}_DESC`)}</p>
          <a className={styles.popover_link} target='_blank' href={technology.link}>
            {technology.link}
          </a>
        </div>
      )}
      <img
        className={styles.image} //force prettier break
        id={`technology_${technology.name}`}
        alt={technology.name}
        src={`/static/images/technologies/${technology.name}-icon.svg`}
        style={{ opacity: technology.unlocked ? 1 : 0.5 }}></img>
    </button>
  );
}
