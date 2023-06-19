import { SET_EXCHANGE_RATES } from '../actions';
import initialState from './initialState';

const exchangeReducer = (state = initialState.wallet.expenses, action) => {
  switch (action.type) {
  case SET_EXCHANGE_RATES:
    return [...state, action.exchangeRates];
  default:
    return state;
  }
};

export default exchangeReducer;
