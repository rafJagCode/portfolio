import styles from './NavLink.module.scss';
import useTranslation from '@/translation/useTranslation';

export default function NavLink({ link, index }) {
  const { t } = useTranslation();
  return (
    <a className={styles.navlink} href={link.link} tabIndex={4 + index}>
      <div className='navlink__icon'>{link.icon}</div>
      <p className='navlink__name'>{t(link.name)}</p>
    </a>
  );
}
