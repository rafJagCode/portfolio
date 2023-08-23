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
  const [isEmailValid, setIsEmailValid, emailErrorMessage, validateEmail] = useValidateEmail();
  const [isMessageValid, setIsMessageValid, messageErrorMessage, validateMessage] = useValidateMessage();
  const handleEmailBlur = (e) => validateEmail(e.target.value);
  const handleMessageBlur = (e) => validateMessage(e.target.value);

  const handleEmail = async (e) => {
    e.preventDefault();
    dispatch(actions.turnSignalsOn());
    validateEmail(emailRef.current.value);
    validateMessage(messageRef.current.value);
    if (!isEmailValid || !isMessageValid) {
      dispatch(actions.showDialog('DIALOG_FORM_FILLED_INCORRECTLY'));
      return;
    }
    const data = {
      from: emailRef.current.value,
      message: messageRef.current.value,
    };
    const response = await sentEmail(data);
    dispatch(actions.showDialog(response.message));
  };

  return (
    <form className={styles.container}>
      <div className={styles.input_container}>
        <input ref={emailRef} onBlur={handleEmailBlur} onFocus={() => setIsEmailValid('focused')} data-valid={isEmailValid} placeholder={t('EMAIL_PLACEHOLDER')} type='email' id='email' name='email' required tabIndex='8'></input>
        {!isEmailValid ? <p className={styles.error_message}>{t(emailErrorMessage)}</p> : null}
      </div>
      <div className={styles.message_container} data-valid={isMessageValid}>
        <textarea ref={messageRef} onBlur={handleMessageBlur} onFocus={() => setIsMessageValid('focused')} placeholder={t('MESSAGE_PLACEHOLDER')} id='message' name='message' rows='10' required tabIndex='9'></textarea>
        {!isMessageValid ? <p className={styles.error_message}>{t(messageErrorMessage)}</p> : null}
      </div>

      <button onClick={handleEmail} tabIndex='10'>
        <FaSatelliteDish />
        {t('MESSAGE_BUTTON')}
      </button>
    </form>
  );
}
