import ParticlesBackground from '@/components/particles_background/ParticlesBackground';
import ReactFullpage from '@fullpage/react-fullpage';
import styles from './Sections.module.scss';
import Footer from '@/components/footer/Footer';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

export default function Sections({state}){
	const dispatch = useDispatch();

	useEffect(()=>{
		const fullpageApi = state.fullpageApi;
		dispatch({type: 'SET_FULLPAGE_API', fullpageApi: fullpageApi});
		const anchor = '#' + window.location.hash.substr(1);
		fullpageApi.moveTo(anchor);
	}, []);

	return([
		<ParticlesBackground className={styles.sections__particles} key="particles"/>,
		<ReactFullpage.Wrapper key="fullpage__wrapper">
			<section className="section">
				<div className={styles.section__container}>
				</div>
			</section>
			<section className="section">
				<div className={styles.section__container}></div>
			</section>
			<section className="section">
				<div className={styles.section__container}></div>
			</section>
			<section className="section">
				<div className={styles.section__container} data-is-last="true"></div>
				<Footer/>
			</section>
		</ReactFullpage.Wrapper>
	]);
}