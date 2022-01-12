import styles from './NavLink.module.scss';
import Translation from '@/components/Translation'

export default function NavLink({link, fullpageApi}) {
	return (
		<a className={styles.navlink} onClick={()=>fullpageApi.moveTo(link.link)}>
			<div className="navlink__icon">{link.icon}</div>
			<p className="navlink__name">
				<Translation text={link.name}/>
			</p>
		</a>
	)
}
