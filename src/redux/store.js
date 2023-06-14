// configure aqui sua store
import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
// import rootReducer from './reducers';
import userReducer from './reducers/user';

const store = createStore(userReducer, composeWithDevTools());

if (window.Cypress) {
  window.store = store;
}

export default store;
