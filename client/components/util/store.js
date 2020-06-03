import { createStore } from 'redux';
import { authentication } from './reducers/authentication';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
export const Store = createStore(authentication, persistedState);