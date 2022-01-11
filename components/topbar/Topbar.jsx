import styles from './Topbar.module.scss';
import NavLink from '@/components/nav_link/NavLink';

export default function Topbar({navigationLinks}) {
	return (
		<nav className={styles.topbar}>
			<div className="topbar__left">
			</div>
			<div className="topbar__right">
			{
				navigationLinks.map((link) =>{
					return <NavLink link={link} key={link.name}/>;
				})
			}
			</div>
		</nav>
	)
}
