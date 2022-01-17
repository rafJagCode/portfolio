import styles from './HomeImage.module.scss';

export default function HomeImage() {
	return (
		<div className={styles.home_image__container}>
			<div className={styles.home_image__plain}>
				<div className={styles.home_image__earth}></div>
				<div className={styles.home_image__orbit}>
					<div className={styles.home_image__ufo}></div>
				</div>
			</div>
		</div>
	)
}
