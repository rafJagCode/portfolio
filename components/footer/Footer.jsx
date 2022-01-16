import styles from './Footer.module.scss';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<p className={styles.footer__author}>Zaprojektował i zakodował Rafał Jagielski</p>
			<p className={styles.footer__copyright}>Copyright &copy;2021 Rafał Jagielski</p>
		</footer>
	)
}
