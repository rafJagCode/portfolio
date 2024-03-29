import styles from './Healthbar.module.scss';
import { useEffect, useState, useRef } from 'react';

export default function Healthbar({ startingHealthPoints, healthPoints }) {
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
    if (healthPoints === startingHealthPoints) return;
    setIsVisible(true);
    debounceHideHealthbar(3000);
  }, [healthPoints]);

  useEffect(() => {
    return () => {
      clearTimeout(timerIDRef.current);
    };
  }, []);

  return (
    <div className={styles.container} style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
      <div className={styles.state} style={{ width: `${(healthPoints / startingHealthPoints) * 100}%` }}></div>
    </div>
  );
}
