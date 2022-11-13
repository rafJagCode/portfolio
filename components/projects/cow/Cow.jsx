import styles from './Cow.module.scss';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

export default function Cow({ imageName }) {
  const cowRef = useRef();
  const dispatch = useDispatch();
  const onClick = async () => {
    dispatch({ type: 'SET_CLICKED_COW_REF', cowRef: cowRef });
    await dispatch({ type: 'QUEUE_COMMAND', command: `COMMAND_CD_${imageName.toUpperCase()}`, directory: imageName.toUpperCase() }).promise;
    await dispatch({ type: 'QUEUE_COMMAND', command: `clear`, directory: imageName.toUpperCase() }).promise;
    dispatch({ type: 'CLEAR_TERMINAL' });
    dispatch({ type: 'CHANGE_DIRECTORY', directory: imageName.toUpperCase() });
    await dispatch({ type: 'QUEUE_COMMAND', command: `COMMAND_CAT_PROJECT_DESCRIPTION`, print: `PRINT_PROJECT_${imageName.toUpperCase()}`, directory: imageName.toUpperCase() }).promise;
  };
  return (
    <button
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
