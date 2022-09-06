import styles from './HomeImage.module.scss';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import getElementDimensions from '@/services/resize_observer/getElementDimensions';
import getElementPosition from '@/services/resize_observer/getElementPosition';

export default function HomeImage() {
  const dispatch = useDispatch();
  const homeUfoContainerRef = useRef();

  const homeUfoContainerResizeObserver = new ResizeObserver(() => {
    dispatch({ type: 'SET_HOME_UFO_CONTAINER_DIMENSION_AND_POSITION', dimensionsAndPosition: { ...getElementDimensions(homeUfoContainerRef.current), ...getElementPosition(homeUfoContainerRef.current) } });
  });

  useEffect(() => {
    homeUfoContainerResizeObserver.observe(homeUfoContainerRef.current);
    return () => {
      homeUfoContainerResizeObserver.unobserve(homeUfoContainerRef.current);
    };
  }, []);

  return (
    <div className={styles.home_image__container}>
      <div className={styles.home_image__plain}>
        <div className={styles.home_image__earth}></div>
        <div
          id="home_image__orbit"
          className={styles.home_image__orbit}
        >
          <div
            id="home__ufo_container"
            className={styles.home_image__ufo}
            ref={homeUfoContainerRef}
          >
            <div className={styles.ufo}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
