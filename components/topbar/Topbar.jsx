import styles from './Topbar.module.scss';
import NavLink from '@/components/navlink/NavLink';

export default function Topbar({Navigation}) {
	return (
		<header className={styles.topbar}>
			<div className={styles.topbar__left}>
			</div>
			<div className={styles.topbar__right}>
				<nav className="topbar__navigation">
					<ul className={styles.topbar__menu}>
						{
							Navigation.navigationLinks.map((link) =>{
								return (
									<li key={link.name}>
										<NavLink link={link} fullpageApi={Navigation.fullpageApi}/>
									</li>
								)
							})
						}
					</ul>
				</nav>
			</div>
		</header>
	)
}
