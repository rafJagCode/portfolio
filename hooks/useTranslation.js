import translations, {availableTranslations} from '@/translations/translations';
import {useSelector} from 'react-redux';

const useTranslation = (text) => {
	const language = useSelector(state => state.language);

	const getTranslation = (text, lang) => {
		return translations[lang][text];
	}

	const t = (text) =>{
		const translatedText = '';
		availableTranslations.some(translation => {
			if(translation === language){
				translatedText = getTranslation(text, language);
				return true;
			}
		})
		return translatedText;
	}

	return {t: t}
}

export default useTranslation;