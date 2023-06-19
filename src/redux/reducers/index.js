import { combineReducers } from 'redux';
import expensesReducer from './expensesReducer';
import userReducer from './userReducer';
import walletReducer from './walletReducer';
import exchangeReducer from './exchangeReducer';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
const rootReducer = combineReducers({
  user: userReducer,
  wallet: walletReducer,
  expenses: expensesReducer,
  exchangeRates: exchangeReducer,
});

export default rootReducer;
