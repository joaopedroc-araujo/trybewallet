import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenseById as removeExpense } from '../redux/actions/index';

class Table extends Component {
  handleTableRows = () => {
    const { expenses } = this.props;
    const filteredExpenses = expenses.filter((expense) => !expense.deleted);
    return filteredExpenses.map((expense) => {
      const { id, description, tag, method, value, currency, exchangeRates } = expense;
      const { name, ask } = exchangeRates
      && exchangeRates[currency] ? exchangeRates[currency] : {};
      const formattedValue = parseFloat(value).toFixed(2);
      const convertedValue = (Number(formattedValue) * parseFloat(ask)).toFixed(2);
      // console.log(formattedValue);
      // console.log(convertedValue);
      return (
        <tr key={ id }>
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{formattedValue}</td>
          <td>{name}</td>
          <td>{parseFloat(ask || 0).toFixed(2)}</td>
          <td>{convertedValue}</td>
          <td>Real</td>
          <td>
            <button type="button">Editar</button>
            <button
              type="button"
              data-testid="delete-btn"
              onClick={ () => this.handleDeleteButtonClick(id) }
            >
              Excluir
            </button>
          </td>
        </tr>
      );
    });
  };

  handleDeleteButtonClick = (id) => {
    const { deleteExpenseById } = this.props;
    deleteExpenseById(id);
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses ? (
            this.handleTableRows())
            : (<td>Nenhuma despesa encontrada.</td>)}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({
      name: PropTypes.string,
      ask: PropTypes.number,
    }).isRequired,
  })).isRequired,
  deleteExpenseById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  exchangeRates: state.wallet.exchangeRates,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseById: (id) => dispatch(removeExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
