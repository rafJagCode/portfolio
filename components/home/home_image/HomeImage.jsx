import styles from './HomeImage.module.scss';
import Ufo from '@/components/ufo/Ufo';

export default function HomeImage() {
	return (
		<div className={styles.home_image__container}>
			<div className={styles.home_image__plain}>
				<div className={styles.home_image__earth}></div>
				<div id='home_image__orbit' className={styles.home_image__orbit}>
					<div id='home__ufo_container' className={styles.home_image__ufo}>
						<div className={styles.ufo}></div>
					</div>
				</div>
			</div>
		</div>
	)
}
