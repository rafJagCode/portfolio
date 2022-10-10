import styles from './HomeImage.module.scss';
import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function HomeImage() {
  const earthRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SET_GLOBAL_REFS', element: 'earth', ref: earthRef });
  }, []);

  return (
    <div
      className={styles.home__image}
      ref={earthRef}
    ></div>
  );
}
