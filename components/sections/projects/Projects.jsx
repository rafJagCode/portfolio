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
        <img className={styles.island} src='/static/images/floating-island.svg' />
        <div className={styles.cows}>
          <Cow imageName='cow1' tabIndex='8' />
          <Cow imageName='cow2' tabIndex='9' />
          <Cow imageName='cow3' tabIndex='10' />
          <Cow imageName='cow4' tabIndex='11' />
        </div>
      </div>
    </div>
  );
}
