import styles from './HomeImage.module.scss';
import { refsTypes, animationsTypes } from '@/configuration/types_conf';
import changeElementStyle from '@/utils/element_functions/changeElementStyle';
import getElementCenterCoordinates from '@/utils/element_functions/getElementCenterCoordinates';
import actions from 'redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';

export default function HomeImage() {
  const dispatch = useDispatch();
  const earthRef = useRef(null);
  const ufoRef = useSelector((state) => state.globalRefs[refsTypes.UFO_REF]);
  const orbitingAnimation = useSelector((state) => state.animations[animationsTypes.ORBITING_ANIMATION]);

  useEffect(() => {
    dispatch(actions.setGlobalRef(refsTypes.EARTH_REF, earthRef));
  }, []);

  useEffect(() => {
    if (!ufoRef) return;
    changeElementStyle(ufoRef.current, 'centerPosition', getElementCenterCoordinates(earthRef.current));
  }, [ufoRef]);

  useEffect(() => {
    if (!orbitingAnimation) return;
    orbitingAnimation.startAnimation();
  }, [orbitingAnimation]);

  return <img id='earth' ref={earthRef} className={styles.earth_image} src='/static/images/planet-earth.svg' alt='planet-earth' />;
}
