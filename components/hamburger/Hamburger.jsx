import styles from './Hamburger.module.scss';
import { useSelector, useDispatch } from 'react-redux';

export default function Hamburger() {
  const isSidebarOpen = useSelector((state) => state.isSidebarOpen);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: 'CHANGE_SIDEBAR_STATE' });
  };

  return (
    <button
      className={styles.button}
      data-is-open={isSidebarOpen}
      onClick={handleClick}
      id="hamburger"
    >
      <span className={styles.line1}></span>
      <span className={styles.line2}></span>
      <span className={styles.line3}></span>
    </button>
  );
}
