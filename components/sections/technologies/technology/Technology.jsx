import styles from './Technology.module.scss';
import DisplayTechnologyAnimation from './DisplayTechnologyAnimation';
import actions from 'redux/actions';
import { useDispatch } from 'react-redux';
import { useRef, useEffect } from 'react';

export default function Technology({ name, startingPosition, removeTechnology }) {
  const dispatch = useDispatch();
  const technologyRef = useRef();

  useEffect(() => {
    const destination = document.getElementById(`technology_${name}`);
    new DisplayTechnologyAnimation(technologyRef, destination) //force prettier break
      .startAnimation()
      .then(() => {
        dispatch(actions.updateTechnologies(name, true));
        removeTechnology(name);
      });
  }, []);

  return <img src={`/static/images/technologies/${name}-icon.svg`} style={{ left: startingPosition.x, top: startingPosition.y }} className={styles.image} ref={technologyRef}></img>;
}
