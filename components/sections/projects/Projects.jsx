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
        <img className={styles.island} src='/static/images/floating-island.png' />
        <div className={styles.cows}>
          <Cow imageName='cow1' />
          <Cow imageName='cow2' />
          <Cow imageName='cow3' />
        </div>
      </div>
    </div>
  );
}
