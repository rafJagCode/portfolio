import styles from './App.module.scss';
import ReactFullpage from '@fullpage/react-fullpage';

export default function App() {

  return (
      <ReactFullpage
		licenseKey = {'YOUR_KEY_HERE'}
		scrollingSpeed = {1000}

		render={() => {
			return (
				<ReactFullpage.Wrapper>
					<div className="section">
					</div>
					<div className="section">
					</div>
				</ReactFullpage.Wrapper>
			);
		}}
	/>
  )
}
