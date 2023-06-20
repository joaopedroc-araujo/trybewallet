import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('testa o header', () => {
  test('Testa se ao adicionar um valor na carteira, o valor é atualizado no header', async () => {
    renderWithRouterAndRedux(
      <Wallet />,
    );

    const valueInput = screen.getByTestId('value-input');
    const currencyInput = screen.getByTestId('currency-input');
    const addExpenseButton = screen.getByRole('button', { name: /Adicionar despesa/i });
    userEvent.type(valueInput, '10');
    await waitFor(() => {
      expect(screen.getByText('EUR')).toBeInTheDocument();
    });

    userEvent.selectOptions(currencyInput, 'EUR');
    userEvent.click(addExpenseButton);
    const headerSum = screen.getByTestId('total-field');
    expect(Number(parseFloat(headerSum.textContent).toFixed(1))).toBeCloseTo(52.3, 0);
  });

  //   test('Testa se, ao selecionar a moeda, a taxa de câmbio está correta', async () => {

//   });
});
