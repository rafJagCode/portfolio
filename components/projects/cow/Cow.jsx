import styles from './Cow.module.scss';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

export default function Cow({ imageName, top, left }) {
  const cowRef = useRef();
  const dispatch = useDispatch();
  const mouseOver = () => {
    dispatch({ type: 'SET_HOVERED_COW', cow: cowRef.current });
  };
  return (
    <button
      className={styles.cow}
      style={{ backgroundImage: `url(/static/images/${imageName}.png`, left: left, top: top }}
      onMouseOver={mouseOver}
      //   onMouseOut="mouseOut()"
      ref={cowRef}
    ></button>
  );
}
