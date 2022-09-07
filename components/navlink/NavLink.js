import styles from './NavLink.module.scss';
import useTranslation from '@/hooks/useTranslation';
import { useSelector } from 'react-redux';

export default function NavLink({ link }) {
  const { t } = useTranslation();
  const fullpageApi = useSelector((state) => state.fullpageApi);
  return (
    <a
      className={styles.navlink}
      onClick={() => fullpageApi.moveTo(link.link)}
    >
      <div className="navlink__icon">{link.icon}</div>
      <p className="navlink__name">{t(link.name)}</p>
    </a>
  );
}
