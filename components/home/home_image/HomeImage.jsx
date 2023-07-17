import styles from './HomeImage.module.scss';
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refsTypes, animationsTypes } from '@/types';
import changeElementStyle from '@/utils/changeElementStyle';
import getElementCenterCoordinates from '@/utils/getElementCenterCoordinates';

export default function HomeImage() {
  const dispatch = useDispatch();
  const earthRef = useRef(null);
  const ufoRef = useSelector((state) => state.globalRefs[refsTypes.UFO_REF]);
  const orbitingAnimation = useSelector((state) => state.animations[animationsTypes.ORBITING_ANIMATION]);

  useEffect(() => {
    dispatch({ type: 'GLOBAL_REFS', refName: refsTypes.EARTH_REF, ref: earthRef });
  }, []);

  useEffect(() => {
    if (!ufoRef) return;
    changeElementStyle(ufoRef.current, 'centerPosition', getElementCenterCoordinates(earthRef.current));
  }, [ufoRef]);

  useEffect(() => {
    if (!orbitingAnimation) return;
    orbitingAnimation.startAnimation();
  }, [orbitingAnimation]);

  return (
    <div
      id="earth"
      className={styles.container}
      ref={earthRef}
    >
      <img
        className={styles.earth_image}
        src="/static/images/planet-earth.png"
        alt="planet-earth"
      />
    </div>
  );
}
