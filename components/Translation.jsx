import {useEffect, useState} from 'react';
import translations from '@/translations/translations';

export default function Translation({text}) {
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
			observer.disconnect();
		}
	}, [])

	const t = (text) =>{
		if(lang === 'pl') return translations.pl.translation[text];
		return translations.en.translation[text];
	}

	return (
		<>
			{t(text)}
		</>
	)
}
