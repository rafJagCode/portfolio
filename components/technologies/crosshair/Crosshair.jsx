import styles from './Crosshair.module.scss';
import CrosshairAnimation from './CrosshairAnimation';
import { refsTypes } from '@/types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

export default function Crosshair() {
  const dispatch = useDispatch();
  const crosshairRef = useRef(null);
  const crosshairAnimationRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ufoRef = useSelector((state) => state.globalRefs[refsTypes.UFO_REF]);
  const arrowRight = useSelector((state) => state.keys.ArrowRight);
  const arrowLeft = useSelector((state) => state.keys.ArrowLeft);

  useEffect(() => {
    return () => {
      crosshairAnimationRef.current.stop();
    };
  }, []);

  useEffect(() => {
    if (!ufoRef || !crosshairRef) return;
    crosshairAnimationRef.current = new CrosshairAnimation(crosshairRef, ufoRef, setPosition);
    crosshairAnimationRef.current.start();
  }, [ufoRef, crosshairRef]);

  useEffect(() => {
    if (!crosshairAnimationRef) return;
    crosshairAnimationRef.current.setIsRightArrowPressed(arrowRight.pressed);
  }, [arrowRight, crosshairAnimationRef]);

  useEffect(() => {
    if (!crosshairAnimationRef) return;
    crosshairAnimationRef.current.setIsLeftArrowPressed(arrowLeft.pressed);
  }, [arrowLeft, crosshairAnimationRef]);

  useEffect(() => {
    if (!crosshairAnimationRef) return;
    dispatch({ type: 'SET_CROSSHAIR_ANGLE', angle: crosshairAnimationRef.current.getCurrentAngle() });
  }, [position, crosshairAnimationRef]);

  return (
    <img
      ref={crosshairRef}
      className={styles.crosshair}
      src={'/static/images/crosshair.svg'}
      style={{ left: position.x, top: position.y, visibility: !crosshairAnimationRef.current ? 'hidden' : 'visible' }}
    ></img>
  );
}
