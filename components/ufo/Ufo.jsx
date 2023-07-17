import styles from './Ufo.module.scss';
import UfoHealthbar from './ufo_healthbar/UfoHealthbar';
import Explosion from '@/components/technologies/explosion/Explosion';
import useUfoExplosions from './hooks/useUfoExplosions';
import { refsTypes } from '@/types';
import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Ufo = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.isSidebarOpen);
  const ufoHits = useSelector((state) => state.ufoHits);
  const [position, setPosition] = useState(null);
  const [ufoRef, engineRef, beamRef] = [useRef(null), useRef(null), useRef(null)];
  const [explosions, removeExplosion] = useUfoExplosions(ufoHits);

  useEffect(() => {
    dispatch({ type: 'GLOBAL_REFS', refName: refsTypes.UFO_REF, ref: ufoRef });
    dispatch({ type: 'GLOBAL_REFS', refName: refsTypes.ENGINE_REF, ref: engineRef });
    dispatch({ type: 'GLOBAL_REFS', refName: refsTypes.BEAM_REF, ref: beamRef });
  }, []);

  useEffect(() => {
    dispatch({ type: 'UPDATE_UFO_POSITION', position });
  }, [position]);

  return (
    <>
      <div
        id="ufo"
        className={styles.container + ' ufo_placeholder'}
        ref={ufoRef}
        data-is-blured={isSidebarOpen}
      >
        <UfoHealthbar />
        <div className={styles.image}></div>
        <div
          id="engine"
          className={styles.engine}
          ref={engineRef}
        ></div>
        <div
          className={styles.beam}
          ref={beamRef}
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
