import initialState from './initialState';
import { ADD_EXPENSE, DELETE_EXPENSE } from '../actions';

const expensesReducer = (state = initialState.wallet.expenses, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return [...state, action.payload];

  case DELETE_EXPENSE:
    return action.payload;

  default:
    return state;
  }
};

export default expensesReducer;
