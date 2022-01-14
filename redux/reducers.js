import types from './types'
import {combineReducers} from 'redux';

const INITIAL_LANGUAGE = 'pl';

const language = (state = INITIAL_LANGUAGE, action) => {
	switch(action.type){
		case types.CHANGE_LANGUAGE:
			localStorage.setItem('language', action.language);
			document.documentElement.lang = action.language;
			return action.language;
		default:
			return state;
	}
}

export default combineReducers({
    language
});