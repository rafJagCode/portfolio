import styles from './App.module.scss';
import Sidebar from '@/components/sidebar/Sidebar';
import Topbar from '@/components/topbar/Topbar';
import ReactFullpage from '@fullpage/react-fullpage';
import Sections from '@/components/sections/Sections';
import Ufo from '@/components/ufo/Ufo';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { defaultTranslation } from '@/translations/translations';

export default function App() {
  const sidebarOpen = useSelector((state) => state.sidebarOpen);
  const ufoOrbitingAnimation = useSelector((state) => state.animations.ufoOrbitingAnimation);
  const dispatch = useDispatch();
  const [isUfoOnStartingPosition, setIsUfoOnStartingPosition] = useState(false);
  const [delayedScroll, setDelayedScroll] = useState(undefined);
  const [isLaunchingInProgress, setIsLaunchingInProgress] = useState(false);

  useEffect(() => {
    const language = localStorage.getItem('language') ? localStorage.getItem('language') : defaultTranslation;
    dispatch({ type: 'CHANGE_LANGUAGE', language: language });
  }, []);

  useEffect(() => {
    if (ufoOrbitingAnimation && delayedScroll) {
      fullpage_api.moveTo(delayedScroll);
      setDelayedScroll(undefined);
    }
  }, [ufoOrbitingAnimation]);

  const onLeave = (origin, destination) => {
    if (origin.anchor !== '#home') return;
    if (!ufoOrbitingAnimation) {
      setDelayedScroll(destination.anchor);
      return false;
    }
    if (!isUfoOnStartingPosition) {
      if (!isLaunchingInProgress) {
        setIsLaunchingInProgress(true);
        ufoOrbitingAnimation.goToLaunchingPosition().then(() => {
          setIsUfoOnStartingPosition(true);
          setIsLaunchingInProgress(false);
          fullpage_api.moveTo(destination.anchor);
        });
      }
      return false;
    }
  };

  const afterLoad = (origin, destination) => {
    if (destination.anchor !== '#home') return;
    if (!ufoOrbitingAnimation) return;
    ufoOrbitingAnimation.animate();
    setIsUfoOnStartingPosition(false);
  };

  return (
    <div className={styles.app__container}>
      <Sidebar />
      <Topbar />
      <main
        className={styles.app__content}
        data-is-blured={sidebarOpen}
      >
        <ReactFullpage
          licenseKey={`Ca(6HeW5q[zX%k*>A#'V%I@@k|5*QKt)s]k3HmOaAPWk}sQdFK('[p0:wkl3f=|Fo0%ijhruscuZC\SYLWQI`}
          scrollingSpeed={1000}
          dragAndMove={true}
          touchSensitivity={3}
          anchors={['#home', '#projects', '#technologies', '#contact']}
          onLeave={onLeave}
          afterLoad={afterLoad}
          render={() => {
            return <Sections />;
          }}
        />
        <Ufo />
      </main>
    </div>
  );
}
