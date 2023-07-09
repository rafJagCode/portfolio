import styles from './ContactForm.module.scss';
import { FaSatelliteDish } from 'react-icons/fa';
import sentEmail from '@/utils/sentEmail';

export default function ContactForm() {
  const handleEmail = async (e) => {
    e.preventDefault();
    const data = {
      from: 'from@test.com',
      message: 'test message',
    };
    const response = await sentEmail(data);
    console.log(response);
  };

  return (
    <form className={styles.contact_form}>
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

      <button onClick={handleEmail}>
        <FaSatelliteDish />
        Send Message
      </button>
    </form>
  );
}
