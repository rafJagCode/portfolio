import styles from './Projects.module.scss';
import Cow from '@/components/projects/cow/Cow';
import Terminal from '@/components/projects/terminal/Terminal';

export default function Projects() {
  return (
    <div className={styles.projects}>
      <Terminal />
      <div className={styles.projects__island_container}>
        <div className={styles.projects__island}></div>
        <Cow imageName="cow1" />
        <Cow imageName="cow2" />
        <Cow imageName="cow3" />
      </div>
    </div>
  );
}
