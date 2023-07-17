import styles from './Projects.module.scss';
import Cow from '@/components/projects/cow/Cow';
import Terminal from '@/components/projects/terminal/Terminal';
import FlyToCowAnimation from '@/animations/FlyToCowAnimation';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

let flyToCowAnimation;

export default function Projects() {
  const dispatch = useDispatch();

  useEffect(() => {
    flyToCowAnimation = new FlyToCowAnimation(dispatch);
  }, []);

  return (
    <div className={styles.container}>
      <Terminal />
      <div className={styles.island_container}>
        <div className={styles.island}></div>
        <Cow
          imageName="cow1"
          flyToCowAnimation={flyToCowAnimation}
        />
        <Cow
          imageName="cow2"
          flyToCowAnimation={flyToCowAnimation}
        />
        <Cow
          imageName="cow3"
          flyToCowAnimation={flyToCowAnimation}
        />
      </div>
    </div>
  );
}
