import styles from './Cow.module.scss';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

export default function Cow({ imageName, top, left }) {
  const cowRef = useRef();
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch({ type: 'SET_CLICKED_COW', cow: cowRef.current });
  };
  return (
    <button
      className={styles.cow}
      style={{ backgroundImage: `url(/static/images/${imageName}.png`, left: left, top: top }}
      ref={cowRef}
      onClick={onClick}
    ></button>
  );
}
