import styles from './Laser.module.scss';
import LaserAnimation from './LaserAnimation';
import { refsTypes } from '@/types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';

export default function Laser({ id, removeLaser }) {
  const dispatch = useDispatch();
  const crosshairAngle = useSelector((state) => state.crosshairAngle);
  const ufoRef = useSelector((state) => state.globalRefs[refsTypes.UFO_REF]);
  const asteroidsData = useSelector((state) => state.asteroidsData);
  const laserRef = useRef(null);
  const laserAnimation = useRef(null);
  const [position, setPosition] = useState(null);

  const getLaserStartingPosition = (ufo, laser) => {
    const x = ufo.offsetLeft + ufo.offsetWidth / 2 - laser.offsetWidth;
    const y = ufo.offsetTop + ufo.offsetHeight / 2 - laser.offsetHeight / 2;
    return { x, y };
  };

  const displayLaser = async (laserAnimation) => {
    await laserAnimation.start();
    removeLaser(id);
  };

  useEffect(() => {
    if (!ufoRef || !laserRef) return;
    const startingPosition = getLaserStartingPosition(ufoRef.current, laserRef.current);
    laserAnimation.current = new LaserAnimation(laserRef, startingPosition, setPosition, crosshairAngle, dispatch);
    displayLaser(laserAnimation.current);
  }, [ufoRef, laserRef]);

  useEffect(() => {
    if (!laserAnimation) return;
    laserAnimation.current.setAsteroidsData(asteroidsData);
  }, [laserAnimation, asteroidsData]);

  return (
    <div
      ref={laserRef}
      className={styles.laser}
      style={{ left: position?.x, top: position?.y, visibility: position ? 'visible' : 'hidden' }}
    ></div>
  );
}
