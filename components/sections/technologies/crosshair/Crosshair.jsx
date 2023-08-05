import styles from './Crosshair.module.scss';
import CrosshairAnimation from './CrosshairAnimation';
import { refsTypes } from '@/configuration/types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';

export default function Crosshair() {
  const dispatch = useDispatch();
  const crosshairRef = useRef(null);
  const crosshairAnimationRef = useRef(null);
  const ufoRef = useSelector((state) => state.globalRefs[refsTypes.UFO_REF]);

  const arrowRight = useSelector((state) => state.keys.ArrowRight);
  const arrowLeft = useSelector((state) => state.keys.ArrowLeft);

  useEffect(() => {
    if (!ufoRef || !crosshairRef) return;
    crosshairAnimationRef.current = new CrosshairAnimation(ufoRef, crosshairRef, dispatch);
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
    return () => {
      crosshairAnimationRef.current.stop();
    };
  }, []);

  return <img ref={crosshairRef} className={styles.image} src={'/static/images/crosshair.svg'}></img>;
}
