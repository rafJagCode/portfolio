import styles from './Ufo.module.scss';
import ReloadingBar from './reloading_bar/ReloadingBar';
import Explosion from '@/components/sections/technologies/explosion/Explosion';
import useUfoExplosions from './hooks/useUfoExplosions';
import actions from 'redux/actions';
import { refsTypes } from '@/configuration/types_conf';
import { useDispatch } from 'react-redux';
import { useRef, useEffect } from 'react';

const Ufo = () => {
  const dispatch = useDispatch();
  const [ufoRef, engineRef, beamRef] = [useRef(null), useRef(null), useRef(null)];
  const [explosions, removeExplosion] = useUfoExplosions();

  useEffect(() => {
    dispatch(actions.setGlobalRef(refsTypes.UFO_REF, ufoRef));
    dispatch(actions.setGlobalRef(refsTypes.ENGINE_REF, engineRef));
    dispatch(actions.setGlobalRef(refsTypes.BEAM_REF, beamRef));
  }, []);

  return (
    <>
      <div id='ufo' className={styles.container + ' ufo_placeholder'} ref={ufoRef} data-is-immune='false'>
        <img className={styles.image} src='/static/images/ufo.svg' alt='ufo' />
        <img id='engine' className={styles.engine} ref={engineRef} src='/static/images/engine.svg' alt='engine' />
        <img className={styles.beam} ref={beamRef} src='/static/images/ufo-beam.svg' alt='ufo-beam' />
        <ReloadingBar />
      </div>
      {explosions.map((explosion) => {
        return <Explosion key={explosion.explosionID} explosion={explosion} removeExplosion={removeExplosion}></Explosion>;
      })}
    </>
  );
};

export default Ufo;
