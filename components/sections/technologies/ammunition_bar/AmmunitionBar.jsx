import styles from './AmmunitionBar.module.scss';
import actions from 'redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';

export default function AmmunitionBar() {
  const magazineCapacity = 5;
  const reloadTime = 1000;
  const dispatch = useDispatch();
  const ammunition = useSelector((state) => state.ammunition);
  const timoutID = useRef(null);

  useEffect(() => {
    if (!ammunition) {
      timoutID = setTimeout(() => dispatch(actions.reloadAmmunition()), reloadTime);
    }
    return () => clearTimeout(timoutID);
  }, [ammunition]);

  return (
    <div className={styles.container}>
      {[...Array(magazineCapacity)].map((bullet, index) => (
        <img
          key={index} //force prettier break
          className={styles.bullet}
          src={`/static/images/bullet${index < magazineCapacity - ammunition ? '-empty' : ''}.svg`}
        />
      ))}
    </div>
  );
}
