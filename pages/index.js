import styles from './App.module.scss';
import ReactFullpage from '@fullpage/react-fullpage';

export default function App() {

  return (
      <ReactFullpage
		licenseKey = {`Ca(6HeW5q[zX%k*>A#'V%I@@k|5*QKt)s]k3HmOaAPWk}sQdFK('[p0:wkl3f=|Fo0%ijhruscuZC\SYLWQI`}
		scrollingSpeed = {1000}

		render={() => {
			return (
				<ReactFullpage.Wrapper>
					<div className="section">
						<div className={styles.section__container}></div>
					</div>
					<div className="section">
						<div className={styles.section__container}></div>
					</div>
					<div className="section">
						<div className={styles.section__container}></div>
					</div>
				</ReactFullpage.Wrapper>
			);
		}}
	/>
  )
}
