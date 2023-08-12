import styles from './LanguageController.module.scss';
import actions from 'redux/actions';
import { refsTypes } from '@/configuration/types';
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
    <nav className={styles.container} id='languageController' ref={languageControllerRef}>
      <a onClick={() => changeLanguage('pl')} data-is-selected={language === 'pl'}>
        PL
      </a>
      <div className={styles.vertical_line}></div>
      <a onClick={() => changeLanguage('en')} data-is-selected={language === 'en'}>
        EN
      </a>
    </nav>
  );
}
