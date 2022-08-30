import styles from './App.module.scss';
import Sidebar from '@/components/sidebar/Sidebar';
import Topbar from '@/components/topbar/Topbar';
import ReactFullpage from '@fullpage/react-fullpage';
import Sections from '@/components/sections/Sections';
import animateToLaunchingPosition from '@/services/ufo/animateToLaunchingPosition';
import swapOrbitingUfoToUfoComponent from '@/services/ufo/swapOrbitingUfoToUfoComponent';
import startUfoEngine from '@/services/ufo/startUfoEngine';
import Ufo from '@/components/ufo/Ufo';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {defaultTranslation} from '@/translations/translations';

export default function App() {
	const sidebarOpen = useSelector(state => state.sidebarOpen);
	const fullpageApi = useSelector(state => state.fullpageApi);
	const dispatch = useDispatch();

	useEffect(()=>{
		const language = localStorage.getItem('language') ? localStorage.getItem('language') : defaultTranslation;
		dispatch({type: 'CHANGE_LANGUAGE', language: language});
	}, [])

	const onLeave = (origin, destination, direction) => {
		dispatch({type: 'SET_SCROLLING_STATE', scrollState: {origin, destination, direction}});
		const ufoOrbit = document.getElementById('home_image__orbit');
		const ufoContainer = document.getElementById('home__ufo_container');

		const ufoOrbitAnimation = ufoOrbit.getAnimations()[0];
		const ufoContainerAnimation = ufoContainer.getAnimations()[0];

		animateToLaunchingPosition(ufoOrbitAnimation, ufoContainerAnimation)
		.then(()=>{
			swapOrbitingUfoToUfoComponent(ufoContainer);
			startUfoEngine();
		})

		return false;
	}

	return (
		<div className={styles.app__container}>
			<Sidebar/>
			<Topbar/>
			<main className={styles.app__content} data-is-blured={sidebarOpen}>
				<ReactFullpage
					licenseKey = {`Ca(6HeW5q[zX%k*>A#'V%I@@k|5*QKt)s]k3HmOaAPWk}sQdFK('[p0:wkl3f=|Fo0%ijhruscuZC\SYLWQI`}
					scrollingSpeed = {1000}
					dragAndMove = {true}
					touchSensitivity = {3}
					anchors = {['#home', '#projects', '#technologies', '#contact']}
					onLeave = {onLeave}
					render={(state)=><Sections state={state}/>}
				/>
				<Ufo/>
			</main>
		</div>
	)
}
