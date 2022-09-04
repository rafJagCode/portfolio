import styles from "./Projects.module.scss";

export default function Projects() {
  return (
    <div className={styles.projects}>
      <div className={styles.projects__island_container}>
        <div className={styles.projects__island}></div>
        <div className={styles.cow1}></div>
        <div className={styles.cow2}></div>
        <div className={styles.cow3}></div>
      </div>
      {/* <div className={styles.projects__container}>
				<div className={styles.projects__ufo_container} id='projects__ufo_container'></div>
				<div className={styles.projects__plain}>
					<div className={styles.projects__sun}></div>
					<div className={styles.projects__uranus_orbit}>
						<div className={styles.projects__uranus_planet}></div>
					</div>
					<div className={styles.projects__jupiter_orbit}>
						<div className={styles.projects__jupiter_planet}></div>
					</div>
					<div className={styles.projects__saturn_orbit}>
						<div className={styles.projects__saturn_planet}></div>
					</div>
				</div>
			</div> */}
    </div>
  );
}
