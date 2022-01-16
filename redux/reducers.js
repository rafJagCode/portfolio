import types from './types'
import {combineReducers} from 'redux';
import store from './store';

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

const FULLPAGE_API = null;

const fullpageApi = (state = FULLPAGE_API, action) => {
	switch(action.type){
		case types.SET_FULLPAGE_API:
			return action.fullpageApi;
		default:
			return state;
	}
}

const SIDEBAR_OPEN = false;

const sidebarOpen = (state = SIDEBAR_OPEN, action) => {
	switch(action.type){
		case types.CHANGE_SIDEBAR_STATE:
			return !state;
		default:
			return state;
	}
}

export default combineReducers({
    language, fullpageApi, sidebarOpen
});