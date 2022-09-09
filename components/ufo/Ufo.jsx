import styles from './Ufo.module.scss';
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { goToStart } from './ufoHandler';
import UfoOrbitingAnimationClass from './UfoOrbitingAnimationClass';

const Ufo = () => {
  const ufoRef = useRef();
  const earthRef = useSelector((state) => state.globalRefs.earth);
  const orbitingAnimationRef = useRef(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!earthRef) return;
    goToStart(ufoRef.current, earthRef.current);
    orbitingAnimationRef.current = new UfoOrbitingAnimationClass(ufoRef.current, earthRef.current);
    orbitingAnimationRef.current.animate();
    dispatch({ type: 'SET_ANIMATIONS', animationName: 'ufoOrbitingAnimation', animation: orbitingAnimationRef.current });
  }, [earthRef]);

  return (
    <div
      className={styles.ufo}
      ref={ufoRef}
    >
      <div className={styles.ufo__image}></div>
      <div className={styles.ufo__fire}></div>
    </div>
  );
};

export default Ufo;
