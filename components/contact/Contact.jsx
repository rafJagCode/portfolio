import styles from './Contact.module.scss';
import ContactForm from './contact_form/ContactForm';
import Satellite from './satellite/Satellite';
import Dialog from './dialog/Dialog';

export default function Contact() {
  return (
    <div className={styles.contact}>
      <ContactForm />
      <Satellite />
      <Dialog />
    </div>
  );
}
