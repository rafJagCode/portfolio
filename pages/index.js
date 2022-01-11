import styles from './App.module.scss';
import navigationLinks from '@/configuration/navigation_links';
import ParticlesBackground from '@/components/particles_background/ParticlesBackground';
import Topbar from '@/components/topbar/Topbar';
import Sidebar from '@/components/sidebar/Sidebar';
import ReactFullpage from '@fullpage/react-fullpage';

export default function App() {

  return (
      <ReactFullpage
		licenseKey = {`Ca(6HeW5q[zX%k*>A#'V%I@@k|5*QKt)s]k3HmOaAPWk}sQdFK('[p0:wkl3f=|Fo0%ijhruscuZC\SYLWQI`}
		scrollingSpeed = {1000}

		render={() => {
			return (
				<div className={styles.app__container}>
					<ParticlesBackground className={styles.app__particles}/>
					<Topbar navigationLinks={navigationLinks}/>
					<Sidebar navigationLinks={navigationLinks}/>
					<ReactFullpage.Wrapper>
						<section className="section">
							<div className={styles.section__container}></div>
						</section>
						<section className="section">
							<div className={styles.section__container}></div>
						</section>
						<section className="section">
							<div className={styles.section__container}></div>
						</section>
					</ReactFullpage.Wrapper>
				</div>
			);
		}}
	/>
  )
}
