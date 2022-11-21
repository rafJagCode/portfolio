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

  return (
    <div
      className={styles.healthbar}
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
      <div
        className={styles.healthbar__state}
        style={{ width: `${(healthPoints / startingHealthPoints) * 100}%` }}
      ></div>
    </div>
  );
}
