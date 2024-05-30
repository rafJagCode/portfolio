import styles from './TechnologiesBar.module.scss';
import TechnologyIcon from './technology_icon/TechnologyIcon';
import { useSelector } from 'react-redux';

export default function TechnologiesBar() {
  const technologies = useSelector((state) => state.technologies);

  return (
    <div className={styles.container}>
      {technologies.map((technology, i) => (
        <TechnologyIcon key={technology.name} technology={technology} tabIndex={i + 8} />
      ))}
    </div>
  );
}
