import styles from './Ufo.module.scss';
import useHelpers from './hooks/useHelpers';
import useAnimations from './hooks/useAnimations';
import positionUfoInEarthCenter from './utils/positionUfoInEarthCenter';
import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Ufo = () => {
  const isSidebarOpen = useSelector((state) => state.isSidebarOpen);
  const [ufoRef, engineRef, beamRef] = [useRef(null), useRef(null), useRef(null)];
  const [ufoHelper, flyingHelper, earthHelper, engineHelper, beamHelper, cowHelper] = useHelpers(ufoRef, engineRef, beamRef);

  useEffect(() => {
    if (!ufoHelper || !earthHelper) return;
    positionUfoInEarthCenter(ufoHelper, earthHelper);
  }, [ufoHelper, earthHelper]);

  useAnimations(ufoHelper, flyingHelper, earthHelper, engineHelper, beamHelper, cowHelper);

  return (
    <div
      className={styles.ufo}
      ref={ufoRef}
      data-is-blured={isSidebarOpen}
    >
      <div className={styles.ufo__image}></div>
      <div
        className={styles.ufo__engine}
        ref={engineRef}
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
