import styles from './NavLink.module.scss';
import useTranslation from '@/translation/useTranslation';

export default function NavLink({ link }) {
  const { t } = useTranslation();
  return (
    <a className={styles.navlink} onClick={() => fullpage_api.moveTo(link.link)}>
      <div className='navlink__icon'>{link.icon}</div>
      <p className='navlink__name'>{t(link.name)}</p>
    </a>
  );
}
