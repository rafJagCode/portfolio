import styles from './Loader.module.scss';
import { useEffect, useState } from 'react';

export default function Loader({ progress, currentImage }) {
  const [angle, setAngle] = useState(1.5 * Math.PI);
  const [position, setPosition] = useState({ x: 0, y: 15 });
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const radius = 15;
    const nextAngle = 1.5 * Math.PI - 2 * Math.PI * progress;
    const x = radius * Math.cos(nextAngle);
    const y = -radius * Math.sin(nextAngle);
    setAngle(nextAngle);
    setPosition({ x, y });
    setTrail((state) => [...state, { x, y }]);
  }, [progress]);

  return (
    <div className={styles.container}>
      <div className={styles.planet}>
        <div className={styles.crater_container1}>
          <div className={styles.crater}></div>
        </div>
        <div className={styles.crater_container2}>
          <div className={styles.crater}></div>
        </div>
        <div className={styles.crater_container3}>
          <div className={styles.crater}></div>
        </div>
        <div className={styles.crater_container4}>
          <div className={styles.crater}></div>
        </div>
        <div className={styles.crater_container5}>
          <div className={styles.crater}></div>
        </div>
        <div className={styles.crater_container6}>
          <div className={styles.crater}></div>
        </div>
        <div className={styles.planet_shadow}></div>
      </div>
      <div className={styles.rocket_container} style={{ transform: `translate(${position.x}rem, ${position.y}rem) rotate(${Math.PI - angle}rad)` }}>
        <div className={styles.rocket}>
          <div className={styles.rocket_tip}></div>
          <div className={styles.rocket_wings}></div>
          <div className={styles.rocket_window}></div>
          <div className={styles.rocket_engine}></div>
          <div className={styles.rocket_flame}>
            <div className={styles.flame_wrapper}>
              <div className={styles.red}></div>
              <div className={styles.orange}></div>
              <div className={styles.gold}></div>
              <div className={styles.white}></div>
            </div>
          </div>
        </div>
      </div>
      {trail.map((pos, index) => (
        <div key={index} className={styles.trail} style={{ transform: `translate(${pos.x}rem, ${pos.y}rem)` }}></div>
      ))}
      <div className={styles.information}>
        <p className={styles.text}>LOADING IMAGES:</p>
        <p className={styles.image}>{currentImage}</p>
      </div>
    </div>
  );
}
