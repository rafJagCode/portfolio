import styles from './Ufo.module.scss';
import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { goToStart } from './ufoHandler';
import UfoOrbitingAnimationClass from './UfoOrbitingAnimationClass';

const Ufo = () => {
  const ufoRef = useRef();
  const earthRef = useSelector((state) => state.globalRefs.earth);
  const orbitingAnimationRef = useRef();

  useEffect(() => {
    if (!earthRef) return;
    goToStart(ufoRef.current, earthRef.current);
    orbitingAnimationRef = new UfoOrbitingAnimationClass(ufoRef.current, earthRef.current);
    orbitingAnimationRef.animate();
  }, [earthRef]);

  const onClick = () => {
    orbitingAnimationRef.goToLaunchingPosition().then(() => console.log('pomise fullfiled'));
  };

  return (
    <div
      className={styles.ufo}
      ref={ufoRef}
      onClick={onClick}
    >
      <div className={styles.ufo__image}></div>
      <div className={styles.ufo__fire}></div>
    </div>
  );
};

export default Ufo;
