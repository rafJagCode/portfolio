import styles from './ContactForm.module.scss';
import { FaSatelliteDish } from 'react-icons/fa';

export default function ContactForm() {
  return (
    <form
      className={styles.contact_form}
      action="submit.php"
      method="POST"
    >
      <input
        placeholder="Your Email"
        type="email"
        id="email"
        name="email"
        required
      ></input>
      <div className={styles.contact_form__message_container}>
        <textarea
          placeholder="Your Massage"
          id="message"
          name="message"
          rows="10"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        value="Submit"
      >
        <FaSatelliteDish />
        Send Message
      </button>
    </form>
  );
}
