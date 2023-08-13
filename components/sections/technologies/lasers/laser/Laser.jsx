import styles from './Laser.module.scss';
import LaserAnimation from './LaserAnimation';
import { refsTypes } from '@/configuration/types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';

export default function Laser({ id, removeLaser }) {
  const dispatch = useDispatch();
  const crosshairAngle = useSelector((state) => state.crosshairAngle);
  const ufoRef = useSelector((state) => state.globalRefs[refsTypes.UFO_REF]);
  const laserRef = useRef(null);
  const laserAnimation = useRef(null);

  const displayLaser = async (laserAnimation) => {
    await laserAnimation.start();
    removeLaser(id);
  };

  useEffect(() => {
    if (!ufoRef || !laserRef) return;
    laserAnimation.current = new LaserAnimation(laserRef, ufoRef, crosshairAngle, dispatch);
    displayLaser(laserAnimation.current);
  }, [ufoRef, laserRef]);

  return <img data-src='/static/images/laser.svg' ref={laserRef} className={styles.image} />;
}
