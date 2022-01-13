import './scss/reset.scss';
import './scss/global.scss';
import './scss/themes.scss';
import {useEffect, useState} from 'react';

export default function MyApp({ Component, pageProps }) {
	const [pageLoading, setPageLoading] = useState(true);

	useEffect(()=>{
		document.querySelector('html').lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'pl';
		setPageLoading(false);
	}, []);

  return (
	  pageLoading ?
	  <div>Loading</div> :
      <Component {...pageProps} />
  )
}