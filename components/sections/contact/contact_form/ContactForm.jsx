import styles from './ContactForm.module.scss';
import useValidateEmail from './hooks/useValidateEmail';
import useValidateMessage from './hooks/useValidateMessage';
import sentEmail from './sentEmail';
import actions from 'redux/actions';
import { FaSatelliteDish } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import useTranslation from '@/translation/useTranslation';

export default function ContactForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const [isEmailValid, emailErrorMessage, validateEmail] = useValidateEmail();
  const [isMessageValid, messageErrorMessage, validateMessage] = useValidateMessage();

  const handleEmail = async (e) => {
    e.preventDefault();
    dispatch(actions.turnSignalsOn());
    const from = emailRef.current.value.trim();
    const message = messageRef.current.value.trim();
    const isEmailOk = validateEmail(from);
    const isMessageOk = validateMessage(message);
    let errorMessage = null;
    let response = null;

    if (!isEmailOk || !isMessageOk) errorMessage = 'DIALOG_FORM_FILLED_INCORRECTLY';
    else {
      try {
        response = await sentEmail({ from, message });
      } catch (e) {
        errorMessage = 'BACKEND_SOMETHING_WENT_WRONG';
      }
    }

    if (errorMessage) dispatch(actions.showDialog(errorMessage));
    else dispatch(actions.showDialog(response.message));

    dispatch(actions.turnSingalsOff());
  };

  return (
    <form className={styles.container}>
      <div className={styles.input_container}>
        <input ref={emailRef} data-valid={isEmailValid} placeholder={t('EMAIL_PLACEHOLDER')} type='email' id='email' name='email' required tabIndex='8'></input>
        {!isEmailValid ? <p className={styles.error_message}>{t(emailErrorMessage)}</p> : null}
      </div>
      <div className={styles.message_container} data-valid={isMessageValid}>
        <textarea ref={messageRef} placeholder={t('MESSAGE_PLACEHOLDER')} id='message' name='message' rows='10' required tabIndex='9'></textarea>
        {!isMessageValid ? <p className={styles.error_message}>{t(messageErrorMessage)}</p> : null}
      </div>

      <button onClick={handleEmail} tabIndex='10'>
        <FaSatelliteDish />
        {t('MESSAGE_BUTTON')}
      </button>
    </form>
  );
}
