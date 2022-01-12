import './scss/reset.scss';
import './scss/global.scss';
import './scss/themes.scss';
import {useEffect} from 'react';

export default function MyApp({ Component, pageProps }) {

	useEffect(()=>{
		document.querySelector('html').lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'pl';
	}, []);

  return (
      <Component {...pageProps} />
  )
}