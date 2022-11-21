import { createStore, applyMiddleware } from 'redux';
import terminalQueueingMiddleware from './middlewares/terminalQueuingMiddleware';
import { combineReducers } from 'redux';
import reducers from './reducers';
import gameReducers from './gameReducers';

const store = createStore(combineReducers({ ...reducers, ...gameReducers }), applyMiddleware(terminalQueueingMiddleware));

export default store;
