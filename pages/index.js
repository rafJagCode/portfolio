import styles from './App.module.scss';
import Sidebar from '@/components/navigation/sidebar/Sidebar';
import Topbar from '@/components/navigation/topbar/Topbar';
import Sections from '@/components/sections/Sections';
import Ufo from '@/components/ufo/Ufo';
import { defaultTranslation } from 'translation/translations';
import { animationsTypes } from '@/configuration/types';
import useScrollMachineState from './hooks/useScrollMachineState';
import useDelayedScroll from './hooks/useDelayedScroll';
import useBeforeScrollHandler from './hooks/useBeforeScrollHandler';
import useAnimations from './hooks/useAnimations';
import ReactFullpage from '@fullpage/react-fullpage';
import actions from 'redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function App() {
  useAnimations();
  const isNavigationVisible = useSelector((state) => state.isNavigationVisible);
  const orbitingAnimation = useSelector((state) => state.animations[animationsTypes.ORBITING_ANIMATION]);
  const engineAnimation = useSelector((state) => state.animations[animationsTypes.ENGINE_ANIMATION]);
  const holdLaunchingPositionAnimation = useSelector((state) => state.animations[animationsTypes.HOLD_LAUNCHING_POSITION_ANIMATION]);
  const [states, updateState, compareState, currentState] = useScrollMachineState();
  const [repeatScrollWhenAnimationReady, delayScroll] = useDelayedScroll(states, updateState, compareState, currentState);
  const handleAnimationsBeforeScroll = useBeforeScrollHandler(engineAnimation, orbitingAnimation, updateState);
  const dispatch = useDispatch();

  useEffect(() => {
    const language = localStorage.getItem('language') ? localStorage.getItem('language') : defaultTranslation;
    dispatch(actions.changeLanguage(language));
  }, []);

  useEffect(() => {
    if (!!orbitingAnimation) updateState('ORBITING_ANIMATION_READY');
  }, [orbitingAnimation]);

  const onLeave = (origin, destination) => {
    if (compareState(states.isOrbitingAnimationNotReady)) return repeatScrollWhenAnimationReady(destination);
    if (compareState(states.isScrollDelayed)) return false;
    if (compareState(states.isScrollAllowed)) return true;

    delayScroll(destination);
    holdLaunchingPositionAnimation.stopAnimation();
    handleAnimationsBeforeScroll(origin);

    return false;
  };

  const afterLoad = (origin, destination) => {
    if (!engineAnimation) return;
    updateState('HANDLE_SCROLL');
    engineAnimation.stopAnimation();
    if (destination.anchor !== '#home') holdLaunchingPositionAnimation.startAnimation();
    if (destination.anchor === '#home') orbitingAnimation.startAnimation();
    if (destination.anchor === '#projects') dispatch(actions.queueCommand('COMMAND_CAT_INSTRUCTION', null, 'PRINT_INSTRUCTION'));
  };

  return (
    <div className={styles.app__container}>
      {isNavigationVisible && <Sidebar />}
      {isNavigationVisible && <Topbar />}
      <main className={styles.app__content}>
        <ReactFullpage
          licenseKey={`Ca(6HeW5q[zX%k*>A#'V%I@@k|5*QKt)s]k3HmOaAPWk}sQdFK('[p0:wkl3f=|Fo0%ijhruscuZC\SYLWQI`}
          normalScrollElements={'#terminal__text, #message'}
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
