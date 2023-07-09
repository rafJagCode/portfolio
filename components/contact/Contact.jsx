import styles from './Contact.module.scss';
import ContactForm from './contact_form/ContactForm';
import Satellite from './satellite/Satellite';

export default function Contact() {
  return (
    <div className={styles.contact}>
      <ContactForm />
      <Satellite />
    </div>
  );
}
