import initialState from './initialState';
import { ADD_EXPENSE, DELETE_EXPENSE } from '../actions';

const expensesReducer = (state = initialState.wallet.expenses, action) => {
  let id;
  let updatedExpenses;

  switch (action.type) {
  case ADD_EXPENSE:
    return [...state, action.payload];

  case DELETE_EXPENSE:
    id = action.payload.id;
    updatedExpenses = state.filter((expense) => expense.id !== id);
    return updatedExpenses;

  default:
    return state;
  }
};

export default expensesReducer;
