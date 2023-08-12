import styles from './ContactForm.module.scss';
import useValidateEmail from './hooks/useValidateEmail';
import useValidateMessage from './hooks/useValidateMessage';
import sentEmail from './sentEmail';
import actions from 'redux/actions';
import { FaSatelliteDish } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';

export default function ContactForm() {
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
      dispatch(actions.showDialog('Contact form was filled inproperly. Please correct marked fields and try again.'));
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
        <input ref={emailRef} onBlur={handleEmailBlur} onFocus={() => setIsEmailValid('focused')} data-valid={isEmailValid} placeholder='Your Email' type='email' id='email' name='email' required></input>
        {!isEmailValid ? <p className={styles.error_message}>{emailErrorMessage}</p> : null}
      </div>
      <div className={styles.message_container} data-valid={isMessageValid}>
        <textarea ref={messageRef} onBlur={handleMessageBlur} onFocus={() => setIsMessageValid('focused')} placeholder='Your Massage' id='message' name='message' rows='10' required></textarea>
        {!isMessageValid ? <p className={styles.error_message}>{messageErrorMessage}</p> : null}
      </div>

      <button onClick={handleEmail}>
        <FaSatelliteDish />
        Send Message
      </button>
    </form>
  );
}
