import styles from './Ufo.module.scss';
import { useEffect, forwardRef } from 'react';
import { useSelector } from 'react-redux';
import parkUfoAboveTheCow from '@/services/ufo/parkUfoAboveTheCow';
import changeWidth from '@/services/ufo/changeWidth';
import changePosition from '@/services/ufo/changePosition';

const Ufo = forwardRef((props, ufoComponent) => {
  const homeUfoContainerDimensionsAndPosition = useSelector((state) => state.homeUfoContainerDimensionsAndPosition);
  const hoveredCow = useSelector((state) => state.hoveredCow);

  useEffect(() => {
    let { top, left } = homeUfoContainerDimensionsAndPosition;
    changeWidth(ufoComponent.current, homeUfoContainerDimensionsAndPosition.width);
    changePosition(ufoComponent.current, top, left);
  }, [homeUfoContainerDimensionsAndPosition]);

  //   useEffect(() => {
  //     if (!hoveredCow) return;
  //     parkUfoAboveTheCow(ufoComponent, hoveredCow);
  //   }, [hoveredCow]);

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
});

export default Ufo;
