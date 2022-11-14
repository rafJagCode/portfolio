import styles from './Cow.module.scss';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

export default function Cow({ imageName }) {
  const cowRef = useRef();
  const dispatch = useDispatch();
  const onClick = async () => {
    dispatch({ type: 'SET_CLICKED_COW_REF', cowRef: cowRef });
  };
  return (
    <button
      data-project={imageName.toUpperCase()}
      className={styles.cow}
      style={{ gridColumn: `${imageName}_column_start / ${imageName}_column_end` }}
      ref={cowRef}
      onClick={onClick}
    >
      <img
        className={styles.cow__image}
        src={`/static/images/${imageName}.png`}
        alt={`image ${imageName}`}
      ></img>
    </button>
  );
}
