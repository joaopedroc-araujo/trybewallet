// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const CHANGE_CURRENCY = 'CHANGE_CURRENCY';
export const SELECTED_CURRENCY = 'SELECTED_CURRENCY';
export const REQUEST_STARTED = 'REQUEST_STARTED';

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

export const selectedCurrency = (currency) => ({
  type: SELECTED_CURRENCY,
  payload: currency,
});
