import styles from './ReloadingBar.module.scss';
import { useSelector } from 'react-redux';

export default function ReloadingBar() {
  const ammunition = useSelector((state) => state.ammunition);

  const getFullBullets = () => {
    return ammunition.reduce((acc, curr) => (curr === 'full' ? acc + 1 : acc), 0);
  };

  return (
    <div className={styles.container} data-is-visible={!getFullBullets()}>
      <p className={styles.text}>RELOADING</p>
    </div>
  );
}
