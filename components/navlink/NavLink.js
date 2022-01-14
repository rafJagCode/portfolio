import styles from './NavLink.module.scss';
import useTranslation from '@/hooks/useTranslation';

export default function NavLink({link, fullpageApi}) {
	const {t} = useTranslation();
	return (
		<a className={styles.navlink} onClick={()=>fullpageApi.moveTo(link.link)}>
			<div className="navlink__icon">{link.icon}</div>
			<p className="navlink__name">
				{t(link.name)}
			</p>
		</a>
	)
}
