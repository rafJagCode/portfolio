import styles from './Cow.module.scss';
import types from 'redux/types';
import { useDispatch } from 'react-redux';

export default function Cow({ imageName }) {
  const dispatch = useDispatch();

  const showProjectDetails = () => {
    const project = imageName.toUpperCase();
    dispatch({ type: types.QUEUE_COMMAND, command: `COMMAND_CD_${project}`, directory: project });
    dispatch({ type: types.QUEUE_COMMAND, command: `clear`, directory: project });
    dispatch({ type: types.QUEUE_COMMAND, command: `COMMAND_CAT_PROJECT_DESCRIPTION`, print: `PRINT_PROJECT_${project}`, directory: project });
  };

  const onClick = () => {
    dispatch({ type: types.SET_CLICKED_COW, cow: imageName });
    showProjectDetails();
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
        id={`button_${imageName}`}
        className={styles.button}
        onClick={onClick}
      >
        <img
          id={`image_${imageName}`}
          className={styles.image}
          src={`/static/images/${imageName}.png`}
          alt={`image ${imageName}`}
        ></img>
      </button>
    </div>
  );
}
