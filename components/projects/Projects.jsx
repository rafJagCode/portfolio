import styles from "./Projects.module.scss";
import Cow from "@/components/projects/cow/Cow";

export default function Projects() {
  return (
    <div className={styles.projects}>
      <div className={styles.projects__island_container}>
        <div className={styles.projects__island}></div>
        <Cow imageName="cow1" top="-17%" left="10%" />
        <Cow imageName="cow2" top="-30%" left="40%" />
        <Cow imageName="cow1" top="-10%" left="65%" />
      </div>
    </div>
  );
}
