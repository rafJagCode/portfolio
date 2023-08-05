import styles from './Projects.module.scss';
import Cow from './cow/Cow';
import Terminal from './terminal/Terminal';
import useCowAbduction from './hooks/useCowAbduction';

export default function Projects() {
  useCowAbduction();

  return (
    <div className={styles.container}>
      <Terminal />
      <div className={styles.island_container}>
        <div className={styles.island}></div>
        <Cow imageName='cow1' />
        <Cow imageName='cow2' />
        <Cow imageName='cow3' />
      </div>
    </div>
  );
}
