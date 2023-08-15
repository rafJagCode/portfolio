import styles from './Crosshair.module.scss';
import CrosshairAnimation from './CrosshairAnimation';
import { refsTypes } from '@/configuration/types_conf';
import { gameStates, compareGameState } from 'redux/game/gameStateMachine';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

export default function Crosshair() {
  const dispatch = useDispatch();
  const crosshairRef = useRef(null);
  const crosshairAnimationRef = useRef(null);
  const ufoRef = useSelector((state) => state.globalRefs[refsTypes.UFO_REF]);
  const gameState = useSelector((state) => state.gameState);
  const [isVisible, setIsVisible] = useState(false);

  const arrowRight = useSelector((state) => state.keys.ArrowRight);
  const arrowLeft = useSelector((state) => state.keys.ArrowLeft);

  useEffect(() => {
    if (!ufoRef || !crosshairRef.current) return;
    crosshairAnimationRef.current = new CrosshairAnimation(ufoRef, crosshairRef, dispatch);
    crosshairAnimationRef.current.start();
    setIsVisible(true);
  }, [ufoRef, crosshairRef.current]);

  useEffect(() => {
    if (!crosshairAnimationRef.current) return;
    crosshairAnimationRef.current.setIsRightArrowPressed(arrowRight.pressed);
  }, [arrowRight]);

  useEffect(() => {
    if (!crosshairAnimationRef.current) return;
    crosshairAnimationRef.current.setIsLeftArrowPressed(arrowLeft.pressed);
  }, [arrowLeft]);

  useEffect(() => {
    return () => {
      crosshairAnimationRef.current.stop();
    };
  }, []);

  if (!compareGameState(gameState, gameStates.PLAYING)) return null;

  return <img ref={crosshairRef} className={styles.image} src={'/static/images/crosshair.svg'} style={{ visibility: isVisible ? 'visible' : 'hidden' }}></img>;
}
