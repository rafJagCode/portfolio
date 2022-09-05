import styles from './Ufo.module.scss';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import resizeUfoComponent from '@/services/ufo/resizeUfoComponent';
import parkUfoAboveTheCow from '@/services/ufo/parkUfoAboveTheCow';

export default function Ufo({ isVisible }) {
  const ufoComponent = useRef();
  const hoveredCow = useSelector((state) => state.hoveredCow);

  const ufoContainerObserver = new ResizeObserver((entries) => {
    const ufoContainer = entries[0].target;
    resizeUfoComponent(ufoContainer, ufoComponent);
  });

  useEffect(() => {
    const ufoContainer = document.getElementById('home__ufo_container');
    if (isVisible) ufoContainerObserver.observe(ufoContainer);
    else ufoContainerObserver.unobserve(ufoContainer);
  }, [isVisible]);

  useEffect(() => {
    if (!hoveredCow) return;
    parkUfoAboveTheCow(ufoComponent, hoveredCow);
  }, [hoveredCow]);

  return (
    <div
      className={styles.ufo}
      id="ufo"
      ref={ufoComponent}
    >
      <div className={styles.ufo__image}></div>
      <div
        className={styles.ufo__fire}
        id="ufo__fire"
      ></div>
    </div>
  );
}
