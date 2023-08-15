import styles from './ReloadingBar.module.scss';
import { useSelector } from 'react-redux';

export default function ReloadingBar() {
  const ammunition = useSelector((state) => state.ammunition);

  return (
    <div className={styles.container} data-is-visible={!ammunition}>
      <p className={styles.text}>RELOADING</p>
    </div>
  );
}
