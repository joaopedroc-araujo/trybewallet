import initialState from './initialState';
import { ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE } from '../actions';

const expensesReducer = (state = initialState.wallet.expenses, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return [...state, action.payload];

  case DELETE_EXPENSE:
    return action.payload;

  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: action.expenses,
    };
  default:
    return state;
  }
};

export default expensesReducer;
