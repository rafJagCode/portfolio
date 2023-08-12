import types from './types';

const changeLanguage = (language) => ({ type: types.CHANGE_LANGUAGE, language });

export default {
  changeLanguage,
};
