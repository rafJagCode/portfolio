import styles from './TechnologiesBar.module.scss';
import { useSelector } from 'react-redux';

export default function TechnologiesBar() {
  const technologies = useSelector((state) => state.technologies);

  return (
    <div className={styles.container}>
      {technologies.map((technology) => (
        <img
          className={styles.image} //force prettier break
          key={technology.name}
          id={`technology_${technology.name}`}
          src={`/static/images/technologies/${technology.name}-icon.svg`}
          style={{ opacity: technology.unlocked ? 1 : 0.5 }}></img>
      ))}
    </div>
  );
}
