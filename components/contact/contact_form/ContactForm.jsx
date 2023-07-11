import styles from './ContactForm.module.scss';
import { FaSatelliteDish } from 'react-icons/fa';
import sentEmail from '@/utils/sentEmail';
import useValidateEmail from './hooks/useValidateEmail';
import useValidateMessage from './hooks/useValidateMessage';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

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
    validateEmail(emailRef.current.value);
    validateMessage(messageRef.current.value);
    if (!isEmailValid || !isMessageValid) {
      dispatch({ type: 'SHOW_DIALOG', message: 'Contact form was filled inproperly. Please correct marked fields and try again.' });
      return;
    }
    const data = {
      from: emailRef.current.value,
      message: messageRef.current.value,
    };
    const response = await sentEmail(data);
    dispatch({ type: 'SHOW_DIALOG', message: response.message });
  };

  return (
    <form className={styles.contact_form}>
      <div className={styles.input_container}>
        <input
          ref={emailRef}
          onBlur={handleEmailBlur}
          onFocus={() => setIsEmailValid('focused')}
          data-valid={isEmailValid}
          placeholder="Your Email"
          type="email"
          id="email"
          name="email"
          required
        ></input>
        {!isEmailValid ? <p className={styles.error_message}>{emailErrorMessage}</p> : null}
      </div>
      <div
        className={styles.contact_form__message_container}
        data-valid={isMessageValid}
      >
        <textarea
          ref={messageRef}
          onBlur={handleMessageBlur}
          onFocus={() => setIsMessageValid('focused')}
          placeholder="Your Massage"
          id="message"
          name="message"
          rows="10"
          required
        ></textarea>
        {!isMessageValid ? <p className={styles.error_message}>{messageErrorMessage}</p> : null}
      </div>

      <button onClick={handleEmail}>
        <FaSatelliteDish />
        Send Message
      </button>
    </form>
  );
}
