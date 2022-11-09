import { createStore, applyMiddleware } from 'redux';
import terminalQueueingMiddleware from './middlewares/terminalQueuingMiddleware';
import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(terminalQueueingMiddleware));

export default store;
