import terminalQueueingMiddleware from './middlewares/terminalQueuingMiddleware';
import gameReducers from './gameReducers';
import reducers from './reducers';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';

const store = createStore(combineReducers({ ...reducers, ...gameReducers }), compose(applyMiddleware(terminalQueueingMiddleware)));

export default store;
