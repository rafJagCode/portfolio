import translations, { availableTranslations } from 'translation/translations';
import { useSelector } from 'react-redux';

const useTranslation = () => {
  const language = useSelector((state) => state.language);

  const getTranslation = (text, lang) => {
    return translations[lang][text];
  };

  const t = (text) => {
    const translatedText = '';
    availableTranslations.some((translation) => {
      if (translation === language) {
        translatedText = getTranslation(text, language);
        return true;
      }
    });
    return translatedText || text;
  };

  return { t: t };
};

export default useTranslation;
