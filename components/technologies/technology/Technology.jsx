import styles from './Technology.module.scss';
import DisplayTechnologyAnimation from './DisplayTechnologyAnimation';
import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Technology({ name, startingPosition, removeTechnology }) {
  const dispatch = useDispatch();
  const technologyRef = useRef();
  useEffect(() => {
    const technologyInBar = document.getElementById(`technology_${name}`);
    const [posX, posY] = [technologyInBar.offsetLeft, technologyInBar.offsetTop].map(Number);
    new DisplayTechnologyAnimation(technologyRef, { x: posX, y: posY }).startAnimation().then(() => {
      dispatch({ type: 'UPDATE_TECHNOLOGIES', technologyName: name, unlocked: true });
      removeTechnology(name);
    });
  }, []);
  return (
    <img
      src={`/static/images/technologies/${name}-icon.svg`}
      style={{ left: startingPosition.x, top: startingPosition.y }}
      className={styles.image}
      ref={technologyRef}
    ></img>
  );
}
