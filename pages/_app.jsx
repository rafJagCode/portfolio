import './scss/reset.scss';
import './scss/global.scss';
import './scss/themes.scss';
import {Provider} from 'react-redux';
import store from '../redux/store';
import {useEffect, useState} from 'react';

export default function MyApp({ Component, pageProps }) {
	const [pageLoading, setPageLoading] = useState(true);

	useEffect(()=>{
		setPageLoading(false);
	}, []);

  return (
	  pageLoading ?
	  <div>Loading</div> :
	  <Provider store={store}>
    	  <Component {...pageProps} />
	  </Provider>
  )
}