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

export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(requestStarted());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const currencies = Object.keys(data)
      .filter((currency) => currency !== 'USDT')
      .map((currency) => currency);
    dispatch(changeCurrency(currencies));
    // console.log(currencies);
  };
}

export const addExpense = (expenses) => ({
  type: ADD_EXPENSE,
  payload: expenses,
});

export function fetchChangeRates() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();

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

// export const updateExchangeRates = () => async (dispatch, getState) => {
//   dispatch(requestStarted());

//   const response = await fetch('https://economia.awesomeapi.com.br/json/all');
//   const data = await response.json();

//   const newExchangeRates = Object.entries(data)
//     .reduce((rates, [currency, currencyData]) => {
//       rates[currency] = currencyData;
//       return rates;
//     }, {});

//   const { expenses } = getState().wallet;
//   const updatedState = {
//     ...getState().wallet,
//     expenses: [...expenses],
//     exchangeRates: newExchangeRates,
//   };

//   dispatch({ type: SET_EXCHANGE_RATES, exchangeRates: newExchangeRates });
//   dispatch({ type: UPDATE_GLOBAL_STATE, payload: updatedState });
// };
