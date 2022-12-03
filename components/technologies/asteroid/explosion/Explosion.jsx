import styles from './Explosion.module.scss';
import ExplosionAnimation from './ExplosionAnimation';
import { useEffect, useState, useRef } from 'react';

export default function Explosion({ explosion, removeExplosion }) {
  const { explosionID, position: explosionPosition, size, imageName, framesAmount } = explosion;
  const [position, setPosition] = useState(null);
  const explosionRef = useRef(null);

  useEffect(() => {
    setPosition({ x: explosionPosition.x - size / 2, y: explosionPosition.y - size / 2 });
  }, []);

  const animateExplosion = async (explosionAnimation) => {
    await explosionAnimation.start();
    removeExplosion(explosionID);
  };

  useEffect(() => {
    if (!position || !explosionRef.current) return;
    const explosionAnimation = new ExplosionAnimation(explosionRef, size, framesAmount);
    animateExplosion(explosionAnimation);
  }, [position, explosionRef]);

  return (
    <>
      {position && (
        <div
          ref={explosionRef}
          className={styles.explosion}
          style={{ background: `url('/static/images/${imageName}.png')`, height: size, left: position.x, top: position.y }}
        ></div>
      )}
    </>
  );
}
