import styles from './Dialog.module.scss';
import actions from 'redux/actions';
import useTranslation from '@/translation/useTranslation';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function Dialog() {
  const { t } = useTranslation();
  const message = useSelector((state) => state.dialog.message);
  const isVisible = useSelector((state) => state.dialog.isVisible);
  const dispatch = useDispatch();

  const closeDialog = () => dispatch(actions.hideDialog());

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(closeDialog, 3000);
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <>
      {isVisible ? (
        <div className={styles.container}>
          <p className={styles.text}>{t(message)}</p>
          <button className={styles.button} onClick={closeDialog} tabIndex='11'>
            OK
          </button>
        </div>
      ) : null}
    </>
  );
}
