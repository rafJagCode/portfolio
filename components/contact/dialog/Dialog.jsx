import styles from './Dialog.module.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Dialog() {
  const message = useSelector((state) => state.dialog.message);
  const isVisible = useSelector((state) => state.dialog.isVisible);
  const dispatch = useDispatch();
  const closeDialog = () => dispatch({ type: 'HIDE_DIALOG' });

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => dispatch({ type: 'HIDE_DIALOG' }), 3000);
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <>
      {isVisible ? (
        <div className={styles.container}>
          <p className={styles.text}>{message}</p>
          <button
            className={styles.button}
            onClick={closeDialog}
          >
            OK
          </button>
        </div>
      ) : null}
    </>
  );
}
