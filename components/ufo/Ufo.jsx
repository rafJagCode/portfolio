import styles from './Ufo.module.scss';
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { goToStart } from './ufoHandler';
import UfoOrbitingAnimationClass from './UfoOrbitingAnimationClass';
import UfoEngineAnimationClass from './UfoEngineAnimationClass';
import UfoHoveringOverCowAnimationClass from './UfoHoveringOverCowAnimationClass';

const Ufo = () => {
  const ufoRef = useRef();
  const fireRef = useRef();
  const orbitingAnimationRef = useRef(undefined);
  const hoveringOverCowAnimationRef = useRef(new UfoHoveringOverCowAnimationClass());
  const beamRef = useRef();

  const earthRef = useSelector((state) => state.globalRefs.earth);
  const clickedCow = useSelector((state) => state.clickedCow);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!earthRef) return;
    goToStart(ufoRef.current, earthRef.current);
    orbitingAnimationRef.current = new UfoOrbitingAnimationClass(ufoRef.current, earthRef.current);
    orbitingAnimationRef.current.startOrbiting();
    dispatch({ type: 'SET_ANIMATIONS', animationName: 'ufoOrbitingAnimation', animation: orbitingAnimationRef.current });
  }, [earthRef]);

  useEffect(() => {
    dispatch({ type: 'SET_ANIMATIONS', animationName: 'ufoEngineAnimation', animation: new UfoEngineAnimationClass(fireRef.current) });
  }, []);

  useEffect(() => {
    hoveringOverCowAnimationRef.current.stopHovering();
    if (!clickedCow) return;
    hoveringOverCowAnimationRef.current.startHovering(ufoRef.current, clickedCow, beamRef.current);
  }, [clickedCow]);

  return (
    <div
      className={styles.ufo}
      ref={ufoRef}
    >
      <div className={styles.ufo__image}></div>
      <div
        className={styles.ufo__fire}
        ref={fireRef}
      ></div>
      <div
        className={styles.ufo__beam}
        ref={beamRef}
        style={{ opacity: 0 }}
      ></div>
    </div>
  );
};

export default Ufo;
