import styles from './Ufo.module.scss';
import Explosion from '@/components/technologies/explosion/Explosion';
import useHelpers from './hooks/useHelpers';
import useAnimations from './hooks/useAnimations';
import useUfoExplosions from './hooks/useUfoExplosions';
import positionUfoInEarthCenter from './utils/positionUfoInEarthCenter';
import { refsTypes } from '@/types';
import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Ufo = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.isSidebarOpen);
  const ufoHits = useSelector((state) => state.ufoHits);
  const [position, setPosition] = useState(null);
  const [ufoRef, engineRef, beamRef] = [useRef(null), useRef(null), useRef(null)];
  const [ufoHelper, flyingHelper, earthHelper, engineHelper, beamHelper, cowHelper] = useHelpers(ufoRef, engineRef, beamRef, position, setPosition);
  const [explosions, removeExplosion] = useUfoExplosions(ufoHits);

  useEffect(() => {
    if (!ufoRef) return;
    dispatch({ type: 'GLOBAL_REFS', refName: refsTypes.UFO_REF, ref: ufoRef });
  }, [ufoRef]);

  useEffect(() => {
    if (!ufoHelper || !earthHelper) return;
    positionUfoInEarthCenter(ufoHelper, earthHelper);
  }, [ufoHelper, earthHelper]);

  useEffect(() => {
    dispatch({ type: 'UPDATE_UFO_POSITION', position });
  }, [position]);

  useAnimations(ufoHelper, flyingHelper, earthHelper, engineHelper, beamHelper, cowHelper);

  return (
    <>
      <div
        className={styles.ufo}
        ref={ufoRef}
        data-is-blured={isSidebarOpen}
        style={!position ? { visibility: 'hidden' } : { left: position.x, top: position.y }}
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
      {explosions.map((explosion) => {
        return (
          <Explosion
            key={explosion.explosionID}
            explosion={explosion}
            removeExplosion={removeExplosion}
          ></Explosion>
        );
      })}
    </>
  );
};

export default Ufo;
