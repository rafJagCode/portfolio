import styles from './Contact.module.scss';
import ContactForm from './contact_form/ContactForm';

export default function Contact() {
  return (
    <div className={styles.contact}>
      <ContactForm />
    </div>
  );
}
