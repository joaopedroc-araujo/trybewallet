import initialState from './initialState';
import { ADD_EXPENSE } from '../actions';

const expensesReducer = (state = initialState.wallet, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };

  default:
    return state;
  }
};

export default expensesReducer;
