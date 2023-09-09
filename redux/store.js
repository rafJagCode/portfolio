import terminalQueueingMiddleware from './middlewares/terminalQueuingMiddleware';
import reducers from './reducers';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';

const store = createStore(combineReducers({ ...reducers }), compose(applyMiddleware(terminalQueueingMiddleware)));

export default store;
