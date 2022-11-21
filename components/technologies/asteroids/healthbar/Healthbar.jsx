import styles from './Healthbar.module.scss';
import { useMemo, useEffect, useState } from 'react';

export default function Healthbar({ asteroidHits }) {
  const lives = useMemo(() => 5);
  const [currentLives, setCurrentLives] = useState(lives);

  useEffect(() => {
    if (!asteroidHits || !asteroidHits.length) return;
    setCurrentLives(lives - asteroidHits.length);
  }, [asteroidHits]);

  return (
    <div className={styles.healthbar}>
      <div
        className={styles.healthbar__state}
        style={{ width: `${(currentLives / lives) * 100}%` }}
      ></div>
    </div>
  );
}
