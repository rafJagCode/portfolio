import styles from './Cow.module.scss';
import actions from 'redux/actions';
import { useDispatch } from 'react-redux';

export default function Cow({ imageName, tabIndex }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div id={`ufo_placeholder_${imageName}`} className={styles.ufo_placeholder + ' ufo_placeholder'}></div>
      <button id={`button_${imageName}`} className={styles.button} onClick={() => dispatch(actions.setClickedCow(imageName))} tabIndex={tabIndex}>
        <img id={`image_${imageName}`} className={styles.image} src={`/static/images/${imageName}.svg`} alt={`image ${imageName}`}></img>
      </button>
    </div>
  );
}
