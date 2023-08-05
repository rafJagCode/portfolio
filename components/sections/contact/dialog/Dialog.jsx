import styles from './Dialog.module.scss';
import types from 'redux/types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function Dialog() {
  const message = useSelector((state) => state.dialog.message);
  const isVisible = useSelector((state) => state.dialog.isVisible);
  const dispatch = useDispatch();

  const closeDialog = () => dispatch({ type: types.HIDE_DIALOG });

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(closeDialog, 3000);
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <>
      {isVisible ? (
        <div className={styles.container}>
          <p className={styles.text}>{message}</p>
          <button className={styles.button} onClick={closeDialog}>
            OK
          </button>
        </div>
      ) : null}
    </>
  );
}
