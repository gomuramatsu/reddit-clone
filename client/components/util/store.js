import { createStore } from 'redux';
import { authentication } from './reducers/authentication';

export const Store = createStore(authentication);