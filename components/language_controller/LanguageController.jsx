import styles from './LanguageController.module.scss';
import {LanguageSwitcher} from "next-export-i18n";

export default function LanguageControler() {

	return (
		<nav className={styles.language_controller}>
			<LanguageSwitcher className="test" lang="pl">PL</LanguageSwitcher>
			<div className={styles.language_controller__vertical_line}></div>
			<LanguageSwitcher lang="en">EN</LanguageSwitcher>
		</nav>
	)
}
