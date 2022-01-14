import styles from './Topbar.module.scss';
import NavLink from '@/components/navlink/NavLink';
import LanguageController from '@/components/language_controller/LanguageController';
import navigationLinks from '@/configuration/navigation_links';

export default function Topbar() {
	return (
		<header className={styles.topbar}>
			<div className={styles.topbar__left}>
				<LanguageController/>
			</div>
			<div className={styles.topbar__right}>
				<nav className="topbar__navigation">
					<ul className={styles.topbar__menu}>
						{
							navigationLinks.map((link) =>{
								return (
									<li key={link.name}>
										<NavLink link={link}/>
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
