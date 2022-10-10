import styles from './LanguageController.module.scss';
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function LanguageController() {
  const languageControllerRef = useRef();
  const language = useSelector((state) => state.language);
  const dispatch = useDispatch();

  const changeLanguage = (language) => {
    dispatch({ type: 'CHANGE_LANGUAGE', language: language });
  };

  useEffect(() => {
    dispatch({ type: 'SET_GLOBAL_REFS', element: 'languageController', ref: languageControllerRef });
  }, []);

  return (
    <nav
      className={styles.language_controller}
      id="languageController"
      ref={languageControllerRef}
    >
      <a
        onClick={() => changeLanguage('pl')}
        data-is-selected={language === 'pl'}
      >
        PL
      </a>
      <div className={styles.language_controller__vertical_line}></div>
      <a
        onClick={() => changeLanguage('en')}
        data-is-selected={language === 'en'}
      >
        EN
      </a>
    </nav>
  );
}
