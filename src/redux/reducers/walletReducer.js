import initialState from './initialState';
import { CHANGE_CURRENCY } from '../actions';

const walletReducer = (state = initialState.wallet.currencies, action) => {
  switch (action.type) {
  case CHANGE_CURRENCY:
    return action.payload;

  default:
    return state;
  }
};

export default walletReducer;
