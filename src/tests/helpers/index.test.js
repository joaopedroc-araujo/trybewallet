import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
// import { Router } from 'react-router-dom';
import { legacy_createStore as createStore } from 'redux';
// import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import rootReducer from '../../redux/reducers';
import { fetchCurrencies, CHANGE_CURRENCY, REQUEST_STARTED } from '../../redux/actions';
import App from '../../App';
// import Wallet from '../../pages/Wallet';
import Login from '../../pages/Login';
import { renderWithRouter, renderWithRouterAndRedux } from './renderWith';

const emailTestId = 'email-input';
const emailTest = 'teste@teste.com';

describe('testa o App', () => {
  test('Verifica se a rota para a página de Login é "/"', () => {
    const history = createMemoryHistory();
    history.push('/');
    renderWithRouterAndRedux(<App />, { history });
    const loginText = screen.getByText(/Login/i);
    expect(loginText).toBeInTheDocument();
  });
  test('Verifica se a rota para a página de Carteira é "/carteira"', () => {
    const history = createMemoryHistory();
    history.push('/carteira');
    renderWithRouterAndRedux(<App />, { history });
    const walletText = screen.getByTestId('value-input');
    expect(walletText).toBeInTheDocument();
  });
});

describe('testa a página de login', () => {
  test('Verifica se a página contém um titulo h2 com o texto Login', () => {
    renderWithRouterAndRedux(<Login />);
    const title = screen.getByText(/Login/i);
    const emailInput = screen.getByTestId(emailTestId);
    expect(title).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  test('Verifica se o botão está desabilitado quando os inputs não estão sendo preenchidos corretamente', () => {
    renderWithRouterAndRedux(<Login />);
    const button = screen.getByRole('button', { name: /Entrar/i });
    expect(button).toBeDisabled();
  });

  test('Verifica se o botão fica habilitado ao preencher os inputs corretamente', () => {
    renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /Entrar/i });
    expect(button).toBeDisabled();
    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, '1234567');
    expect(button).toBeEnabled();
  });

  test('Verifica se o input email fica salvo no estado global', async () => {
    const store = createStore(rootReducer);
    renderWithRouter(
      <Provider store={ store }>
        <Login />
      </Provider>,
    );

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /Entrar/i });
    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(button);

    await waitFor(() => {
      const { user } = store.getState();
      expect(user.email).toBe(emailTest);
    });
  });
});

describe('Testa as actions e reducers', () => {
  test('Testa a action fetchCurrencies', async () => {
    const mockData = {
      USD: {},
      CAD: {},
      GBP: {},
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const expectedCurrencies = [
      'USD',
      'CAD',
      'GBP',
    ];

    const actions = [
      { type: REQUEST_STARTED },
      { type: CHANGE_CURRENCY, payload: expectedCurrencies },
    ];

    const mockDispatch = jest.fn();
    const mockStore = {
      getState: jest.fn(),
      dispatch: mockDispatch,
    };

    await fetchCurrencies()(mockStore.dispatch);

    expect(mockDispatch.mock.calls.length).toBe(actions.length);
    actions.forEach((action, index) => {
      expect(mockDispatch.mock.calls[index][0]).toEqual(action);
    });
  });
});
