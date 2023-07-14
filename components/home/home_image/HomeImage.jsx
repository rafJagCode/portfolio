import styles from './HomeImage.module.scss';
import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refsTypes } from '@/types';

export default function HomeImage() {
  const earthRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GLOBAL_REFS', refName: refsTypes.EARTH_REF, ref: earthRef });
  }, []);

  return (
    <div
      className={styles.container}
      ref={earthRef}
    ></div>
  );
}
