import styles from './Explosion.module.scss';
import ExplosionAnimation from './ExplosionAnimation';
import { useEffect, useState, useRef } from 'react';

export default function Explosion({ explosionID, hitpoint, size, removeExplosion }) {
  const [position, setPosition] = useState(null);
  const explosionRef = useRef(null);

  useEffect(() => {
    setPosition({ x: hitpoint.x - size / 2, y: hitpoint.y - size / 2 });
  }, []);

  const animateExplosion = async (explosionAnimation) => {
    await explosionAnimation.start();
    removeExplosion(explosionID);
  };

  useEffect(() => {
    if (!position || !explosionRef.current) return;
    const explosionAnimation = new ExplosionAnimation(explosionRef, size);
    animateExplosion(explosionAnimation);
  }, [position, explosionRef]);

  return (
    <>
      {position && (
        <div
          ref={explosionRef}
          className={styles.explosion}
          style={{ height: size, left: position.x, top: position.y }}
        ></div>
      )}
    </>
  );
}
