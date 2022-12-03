import styles from './Explosion.module.scss';
import ExplosionAnimation from './ExplosionAnimation';
import { useEffect, useRef } from 'react';

export default function Explosion({ explosion, removeExplosion }) {
  const { explosionID, position, size, imageName, framesAmount } = explosion;
  const explosionRef = useRef(null);

  const animateExplosion = async (explosionAnimation) => {
    await explosionAnimation.start();
    removeExplosion(explosionID);
  };

  useEffect(() => {
    if (!explosionRef.current) return;
    const explosionAnimation = new ExplosionAnimation(explosionRef, size, framesAmount);
    animateExplosion(explosionAnimation);
  }, [explosionRef]);

  return (
    <div
      ref={explosionRef}
      className={styles.explosion}
      style={{ background: `url('/static/images/${imageName}.png')`, height: size, left: position.x, top: position.y }}
    ></div>
  );
}
