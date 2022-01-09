import styles from './Home.module.scss';

export default function Home() {
  return (
    <div id="app" className={styles.app}>
		<div className={styles.sections}>
			<div class={styles.section1}></div>
			<div class={styles.section2}></div>
			<div class={styles.section3}></div>
			<div class={styles.section4}></div>
		</div>
    </div>
  )
}
