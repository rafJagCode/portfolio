import styles from './Explosion.module.scss';
import ExplosionAnimation from './ExplosionAnimation';
import { useEffect, useRef } from 'react';

export default function Explosion({ explosion, removeExplosion }) {
  const { explosionID, position, size, imageName, framesAmount } = explosion;
  const explosionRef = useRef(null);

  const animateExplosion = async () => {
    await new ExplosionAnimation(explosionRef, size, framesAmount).start();
    removeExplosion(explosionID);
  };

  useEffect(() => {
    if (!explosionRef.current) return;
    animateExplosion();
  }, [explosionRef]);

  return <div ref={explosionRef} className={styles.container} style={{ background: `url('/static/images/explosions/${imageName}.png')`, height: size, left: position.x, top: position.y }}></div>;
}
