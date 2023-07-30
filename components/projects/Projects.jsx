import styles from './Projects.module.scss';
import Cow from '@/components/projects/cow/Cow';
import Terminal from '@/components/projects/terminal/Terminal';
import useCowAbduction from './hooks/useCowAbduction';

export default function Projects() {
  useCowAbduction();

  return (
    <div className={styles.container}>
      <Terminal />
      <div className={styles.island_container}>
        <div className={styles.island}></div>
        <Cow imageName="cow1" />
        <Cow imageName="cow2" />
        <Cow imageName="cow3" />
      </div>
    </div>
  );
}
