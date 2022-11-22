import terminalQueueingMiddleware from './middlewares/terminalQueuingMiddleware';
import gameReducers from './gameReducers';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createStore, applyMiddleware, combineReducers } from 'redux';

const store = createStore(combineReducers({ ...reducers, ...gameReducers }), composeWithDevTools(applyMiddleware(terminalQueueingMiddleware)));

export default store;
