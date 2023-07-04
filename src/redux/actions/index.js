// Coloque aqui suas actions
// import updateExchangeRates from './rates';
export const UPDATE_EXCHANGE_RATES = 'UPDATE_EXCHANGE_RATES';
export const ADD_EMAIL = 'ADD_EMAIL';
export const CHANGE_CURRENCY = 'CHANGE_CURRENCY';
export const SELECTED_CURRENCY = 'SELECTED_CURRENCY';
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const FETCH_EXCHANGE_RATES = 'FETCH_EXCHANGE_RATES';
export const SET_EXCHANGE_RATES = 'SET_EXCHANGE_RATES';
export const SET_ASK_RATES = 'SET_ASK_RATES';
export const GET_EXCHANGE_RATE = 'GET_EXCHANGE_RATE';
export const UPDATE_GLOBAL_STATE = 'UPDATE_GLOBAL_STATE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const requestStarted = () => ({
  type: REQUEST_STARTED,
});

export const changeCurrency = (currency) => ({
  type: CHANGE_CURRENCY,
  payload: currency,
});

export const addExpense = (expenses) => ({
  type: ADD_EXPENSE,
  payload: expenses,
});

export function fetchChangeRates() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const currencies = Object.keys(data)
      .filter((currency) => currency !== 'USDT')
      .map((currency) => currency);
    dispatch(changeCurrency(currencies));
    const exchangeRates = Object.entries(data)
      .reduce((rates, [currency, currencyData]) => {
        rates[currency] = currencyData;
        return rates;
      }, {});
    // console.log(exchangeRates);
    dispatch({ type: SET_EXCHANGE_RATES, exchangeRates });
    // console.log(exchangeRates);
    return exchangeRates;
  };
}

export const deleteExpense = (filteredExpenses) => ({
  type: DELETE_EXPENSE,
  payload: filteredExpenses,
});

export const deleteExpenseById = (expenseId) => (dispatch, getState) => {
  const { expenses } = getState().wallet;
  // console.log(expenses);
  const deletedExpenses = expenses.filter((expense) => expense.id !== expenseId);
  dispatch(deleteExpense(deletedExpenses));
};

export const editExpenseById = (expenses) => ({
  type: EDIT_EXPENSE,
  expenses,
});
