import ParticlesBackground from '@/components/particles_background/ParticlesBackground';
import ReactFullpage from '@fullpage/react-fullpage';
import styles from './Sections.module.scss';
import Footer from '@/components/footer/Footer';
import {useEffect} from 'react';

export default function Sections({state, setFullpageApi}){
	useEffect(()=>{
		setFullpageApi(state.fullpageApi);
		const anchor = '#' + window.location.hash.substr(1);
		state.fullpageApi.moveTo(anchor);
	}, [state]);

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