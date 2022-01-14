import styles from './App.module.scss';
import navigationLinks from '@/configuration/navigation_links';
import Topbar from '@/components/topbar/Topbar';
import Sidebar from '@/components/sidebar/Sidebar';
import ReactFullpage from '@fullpage/react-fullpage';
import Sections from '@/components/sections/Sections';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {defaultTranslation} from '@/translations/translations';

export default function App() {
	const dispatch = useDispatch();

	useEffect(()=>{
		const language = localStorage.getItem('language') ? localStorage.getItem('language') : defaultTranslation;
		dispatch({type: 'CHANGE_LANGUAGE', language: language});
	}, [])

	const [fullpageApi, setFullpageApi] = useState();

	const Navigation = {
		navigationLinks: navigationLinks,
		fullpageApi: fullpageApi,
	}

	return (
		<div className={styles.app__container}>
			<Topbar Navigation={Navigation}/>
			<Sidebar/>
			<ReactFullpage
				licenseKey = {`Ca(6HeW5q[zX%k*>A#'V%I@@k|5*QKt)s]k3HmOaAPWk}sQdFK('[p0:wkl3f=|Fo0%ijhruscuZC\SYLWQI`}
				scrollingSpeed = {1000}
				dragAndMove = {true}
				touchSensitivity = {3}
				anchors = {['#home', '#projects', '#technologies', '#contact']}
				callbacks={["afterRender"]}
				render={(state)=><Sections state={state} setFullpageApi={setFullpageApi}/>}
			/>
		</div>
	)
}
