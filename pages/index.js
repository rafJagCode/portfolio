import styles from './App.module.scss';
import Sidebar from '@/components/sidebar/Sidebar';
import Topbar from '@/components/topbar/Topbar';
import ReactFullpage from '@fullpage/react-fullpage';
import Sections from '@/components/sections/Sections';
import Ufo from '@/components/ufo/Ufo';
import handleLeavingHomeUfoAnimation from '@/services/ufo/handleLeavingHomeUfoAnimation';
import swapOrbitingUfoToUfoComponent from '@/services/ufo/swapOrbitingUfoToUfoComponent';
import startUfoEngine from '@/services/ufo/startUfoEngine';
import getElementDimensions from '@/services/resize_observer/getElementDimensions';
import getElementPosition from '@/services/resize_observer/getElementPosition';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { defaultTranslation } from '@/translations/translations';

export default function App() {
  const sidebarOpen = useSelector((state) => state.sidebarOpen);
  const dispatch = useDispatch();
  const [isUfoComponentVisible, setIsUfoComponentVisible] = useState(false);
  const ufoRef = useRef();

  useEffect(() => {
    const language = localStorage.getItem('language') ? localStorage.getItem('language') : defaultTranslation;
    dispatch({ type: 'CHANGE_LANGUAGE', language: language });
  }, []);

  const onLeave = (origin, destination, direction) => {
    if (!isUfoComponentVisible) {
      handleLeavingHomeUfoAnimation().then(() => {
        const ufoContainer = document.getElementById('home__ufo_container');
        dispatch({ type: 'SET_HOME_UFO_CONTAINER_DIMENSION_AND_POSITION', dimensionsAndPosition: { ...getElementDimensions(ufoContainer), ...getElementPosition(ufoContainer) } });
        swapOrbitingUfoToUfoComponent(ufoContainer, ufoRef.current);
        startUfoEngine();
        setIsUfoComponentVisible(true);
        // fullpage_api.moveTo(destination.anchor);
      });
      return false;
    }
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
          render={() => {
            return <Sections />;
          }}
        />
        <Ufo ref={ufoRef} />
      </main>
    </div>
  );
}
