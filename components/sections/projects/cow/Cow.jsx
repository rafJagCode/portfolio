import styles from './Cow.module.scss';
import actions from 'redux/actions';
import { useDispatch } from 'react-redux';

export default function Cow({ imageName }) {
  const dispatch = useDispatch();

  const showProjectDetails = () => {
    const project = imageName.toUpperCase();
    dispatch(actions.queueCommand(`COMMAND_CD_${project}`, project, null));
    dispatch(actions.queueCommand('clear', project, null));
    dispatch(actions.queueCommand('COMMAND_CAT_PROJECT_DESCRIPTION', project, `PRINT_PROJECT_${project}`));
  };

  const onClick = () => {
    dispatch(actions.setClickedCow(imageName));
    showProjectDetails();
  };
  //style={{ gridColumn: `${imageName}_column_start / ${imageName}_column_end` }}
  return (
    <div className={styles.container}>
      <div id={`ufo_placeholder_${imageName}`} className={styles.ufo_placeholder + ' ufo_placeholder'}></div>
      <button id={`button_${imageName}`} className={styles.button} onClick={onClick}>
        <img id={`image_${imageName}`} className={styles.image} src={`/static/images/${imageName}.svg`} alt={`image ${imageName}`}></img>
      </button>
    </div>
  );
}
