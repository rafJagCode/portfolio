import styles from './LanguageController.module.scss';
import {useEffect, useState} from 'react';

export default function LanguageController() {
	const [lang, setLang] = useState('pl');

	useEffect(()=>{
		const html = document.querySelector('html');
		setLang(html.lang);
		const observer = new MutationObserver(() => {
    		setLang(html.lang);
		});

		observer.observe(html, {
			attributes: true,
			attributeFilter: ['lang']
		});

		return ()=>{
			observer.disconect();
		}
	}, [])

	const changeLang = (lang) =>{
		localStorage.setItem('lang', lang);
		document.querySelector('html').lang = lang;
		setLang(lang);
	}

	return (
		<nav className={styles.language_controller}>
			<a onClick={()=>changeLang('pl')} data-is-selected={lang === 'pl'}>PL</a>
			<div className={styles.language_controller__vertical_line}></div>
			<a onClick={()=>changeLang('en')} data-is-selected={lang === 'en'}>EN</a>
		</nav>
	)
}
