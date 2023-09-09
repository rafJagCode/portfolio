import styles from './LanguageController.module.scss';
import actions from 'redux/actions';
import { refsTypes } from '@/configuration/types_conf';
import { useSelector, useDispatch } from 'react-redux';
import { useRef, useEffect } from 'react';

export default function LanguageController() {
  const languageControllerRef = useRef();
  const language = useSelector((state) => state.language);
  const dispatch = useDispatch();

  const changeLanguage = (language) => {
    dispatch(actions.changeLanguage(language));
  };

  useEffect(() => {
    dispatch(actions.setGlobalRef(refsTypes.LANGUAGE_CONTROLLER_REF, languageControllerRef));
  }, []);

  return (
    <div className={styles.container} id='languageController' ref={languageControllerRef}>
      <button onClick={() => changeLanguage('pl')} data-is-selected={language === 'pl'} tabIndex='1'>
        PL
      </button>
      <div className={styles.vertical_line}></div>
      <button onClick={() => changeLanguage('en')} data-is-selected={language === 'en'} tabIndex='2'>
        EN
      </button>
    </div>
  );
}
