import styles from './AmmunitionBar.module.scss';
import actions from 'redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';

export default function AmmunitionBar() {
  const reloadTime = 1000;
  const dispatch = useDispatch();
  const ammunition = useSelector((state) => state.ammunition);
  const timoutID = useRef(null);

  const getFullBullets = () => {
    return ammunition.reduce((acc, curr) => (curr === 'full' ? acc + 1 : acc), 0);
  };

  useEffect(() => {
    if (!getFullBullets()) {
      timoutID = setTimeout(() => dispatch(actions.reloadAmmunition()), reloadTime);
    }
    return () => clearTimeout(timoutID);
  }, [ammunition]);

  return (
    <div className={styles.container}>
      {ammunition.map((bulletState, index) => (
        <img
          key={index} //force prettier break
          className={styles.bullet}
          src={`/static/images/bullet-${bulletState}.svg`}
        />
      ))}
    </div>
  );
}
