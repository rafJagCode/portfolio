import styles from './UfoHealthbar.module.scss';
import useUfoLives from './hooks/useUfoLives';
import UfoLife from './ufo_life/UfoLife';
import { gameStates, compareGameState } from 'redux/game/gameStateMachine';
import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';

export default function UfoHealthbar() {
  const gameState = useSelector((state) => state.gameState);
  const ufoHits = useSelector((state) => state.ufoHits);
  const currentLives = useUfoLives();
  const [isVisible, setIsVisible] = useState(false);
  const timerIDRef = useRef(null);

  const debounceHideHealthbar = (delay) => {
    if (timerIDRef && timerIDRef.current) {
      clearTimeout(timerIDRef.current);
    }
    timerIDRef.current = setTimeout(() => {
      setIsVisible(false);
    }, delay);
  };

  useEffect(() => {
    if (!ufoHits.length) return;
    setIsVisible(true);
    debounceHideHealthbar(5000);
  }, [ufoHits]);

  useEffect(() => {
    return () => {
      clearTimeout(timerIDRef.current);
    };
  }, []);

  if (!compareGameState(gameState, gameStates.PLAYING)) return null;

  return (
    <div className={styles.container} style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
      {currentLives ? currentLives.map((life) => <UfoLife key={`ufo_life_${life.index}`} lifeState={life.state} />) : null}
    </div>
  );
}
