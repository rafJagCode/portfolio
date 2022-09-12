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
  const [ufoOrbitingAnimation, ufoEngineAnimation] = useSelector((state) => {
    return [state.animations.ufoOrbitingAnimation, state.animations.ufoEngineAnimation];
  });
  const dispatch = useDispatch();
  const [isUfoOnStartingPosition, setIsUfoOnStartingPosition] = useState(false);
  const [delayedScroll, setDelayedScroll] = useState(undefined);
  const [isLaunchingInProgress, setIsLaunchingInProgress] = useState(false);

  useEffect(() => {
    const language = localStorage.getItem('language') ? localStorage.getItem('language') : defaultTranslation;
    dispatch({ type: 'CHANGE_LANGUAGE', language: language });
  }, []);

  useEffect(() => {
    if (ufoOrbitingAnimation && delayedScroll) handleDelayedScroll();
  }, [ufoOrbitingAnimation]);

  const delayScroll = (destination) => {
    setDelayedScroll(destination.anchor);
    return false;
  };

  const handleDelayedScroll = () => {
    fullpage_api.moveTo(delayedScroll);
    setDelayedScroll(undefined);
  };

  const goToLaunchingPositionAndScroll = (destination) => {
    setIsLaunchingInProgress(true);
    ufoOrbitingAnimation.stopOrbiting().then(() => {
      setIsUfoOnStartingPosition(true);
      setIsLaunchingInProgress(false);
      fullpage_api.moveTo(destination.anchor);
    });
  };

  const onLeave = (origin, destination) => {
    if (!ufoOrbitingAnimation) return delayScroll(destination);
    ufoEngineAnimation.turnOnEngines();
    if (origin.anchor !== '#home') return true;
    if (isUfoOnStartingPosition) return true;
    if (isLaunchingInProgress) return false;
    goToLaunchingPositionAndScroll(destination);
    return false;
  };

  const afterLoad = (origin, destination) => {
    if (!ufoEngineAnimation) return;
    ufoEngineAnimation.turnOffEngines();
    if (destination.anchor !== '#home') return;
    if (!ufoOrbitingAnimation) return;
    ufoOrbitingAnimation.startOrbiting();
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
