// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CHANGE_CURRENCY, SELECTED_CURRENCY } from '../actions';
import initialState from './initialState';

const walletReducer = (state = initialState.wallet, action) => {
  switch (action.type) {
  case CHANGE_CURRENCY:
    return {
      ...state,
      currencies: action.payload,
    };

  case SELECTED_CURRENCY:
    return {
      ...state,
      selectedCurrency: action.payload,
    };

  default:
    return state;
  }
};

export default walletReducer;
