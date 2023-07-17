import styles from './Cow.module.scss';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

export default function Cow({ imageName, flyToCowAnimation }) {
  //   const cowRef = useRef();
  //   const dispatch = useDispatch();
  const onClick = async () => {
    // dispatch({ type: 'SET_CLICKED_COW_REF', cowRef: cowRef });
    flyToCowAnimation.stopAnimation();
    flyToCowAnimation.setCow(imageName);
    flyToCowAnimation.startAnimation();
  };
  return (
    <div
      className={styles.container}
      style={{ gridColumn: `${imageName}_column_start / ${imageName}_column_end` }}
    >
      <div
        id={`ufo_placeholder_${imageName}`}
        className={styles.ufo_placeholder + ' ufo_placeholder'}
      ></div>

      <button
        data-project={imageName.toUpperCase()}
        className={styles.button}
        // ref={cowRef}
        onClick={onClick}
      >
        <img
          className={styles.image}
          src={`/static/images/${imageName}.png`}
          alt={`image ${imageName}`}
        ></img>
      </button>
    </div>
  );
}
