import styles from './Laser.module.scss';
import LaserAnimation from './LaserAnimation';
import { refsTypes } from '@/types';
import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';

export default function Laser({ id, removeLaser }) {
  const ufoRef = useSelector((state) => state.globalRefs[refsTypes.UFO_REF]);
  const asteroidsCollisionZones = useSelector((state) => state.asteroidsCollisionZones);
  const asteroidsCollisionPoints = useSelector((state) => state.asteroidsCollisionPoints);
  const laserRef = useRef(null);
  const laserAnimation = useRef(null);
  const [position, setPosition] = useState(null);

  const getLaserStartingPosition = (ufo) => {
    const x = ufo.offsetLeft;
    const y = ufo.offsetTop + ufo.offsetHeight / 2;
    return { x, y };
  };

  const displayLaser = async (laserAnimation) => {
    await laserAnimation.start();
    removeLaser(id);
  };

  useEffect(() => {
    if (!ufoRef || !laserRef) return;
    const startingPosition = getLaserStartingPosition(ufoRef.current);
    laserAnimation.current = new LaserAnimation(laserRef, startingPosition, setPosition);
    displayLaser(laserAnimation.current);
  }, [ufoRef, laserRef]);

  useEffect(() => {
    if (!laserAnimation) return;
    laserAnimation.current.setAsteroidsCollisionZones(asteroidsCollisionZones);
  }, [laserAnimation, asteroidsCollisionZones]);

  useEffect(() => {
    if (!laserAnimation) return;
    laserAnimation.current.setAsteroidsCollisionPoints(asteroidsCollisionPoints);
  }, [laserAnimation, asteroidsCollisionPoints]);

  return (
    <div
      ref={laserRef}
      className={styles.laser}
      style={{ left: position?.x, top: position?.y, visibility: position ? 'visible' : 'hidden' }}
    ></div>
  );
}
