import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../redux/actions';
// import { addExpense } from '../redux/actions';

const alimentação = 'Alimentação';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currencySelected: 'USD',
    method: 'Dinheiro',
    tag: alimentação,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.fetchCurrencies());
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleCurrencyChange = (event) => {
    const { value } = event.target;
    this.setState({ currencySelected: value });
  };

  handleMethodChange = (event) => {
    const { value } = event.target;
    this.setState({ method: value });
  };

  handleTagChange = (event) => {
    const { value } = event.target;
    this.setState({ tag: value });
  };

  handleAddExpense = async (event) => {
    event.preventDefault();

    const {
      dispatch,
      addExpense,
    } = this.props;

    const {
      value,
      description,
      currencySelected,
      method,
      tag,
    } = this.state;
    let { id } = this.state;

    const newExpense = {
      id,
      value,
      description,
      currency: currencySelected,
      method,
      tag,
    };

    dispatch(addExpense(newExpense));

    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currencySelected: 'USD',
      method: 'Dinheiro',
      tag: alimentação,
    }));

    id += 1;
  };

  render() {
    const { currencies } = this.props;
    // console.log(currencies);
    const tagOptions = [alimentação, 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const {
      value,
      description,
      currencySelected,
      method,
      tag,
    } = this.state;

    return (
      <div>
        <form>
          <input
            type="number"
            placeholder="Valor da despesa"
            data-testid="value-input"
            onChange={ this.handleInputChange }
            value={ value }
            name="value"
          />

          <input
            type="text"
            placeholder="Descrição da despesa"
            data-testid="description-input"
            value={ description }
            name="description"
            onChange={ this.handleInputChange }
          />

          <select
            data-testid="currency-input"
            value={ currencySelected }
            name="currencySelected"
            onChange={ this.handleCurrencyChange }
          >
            {currencies && currencies.map((currency) => (
              <option key={ currency } value={ currency }>
                {currency}
              </option>
            ))}
          </select>

          <br />
          <select
            data-testid="method-input"
            onChange={ this.handleMethodChange }
            value={ method }
            name="method"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <select
            data-testid="tag-input"
            onChange={ this.handleTagChange }
            value={ tag }
            name="tag"
          >
            {tagOptions.map((tagOption) => (
              <option key={ tagOption } value={ tagOption }>
                {tagOption}
              </option>
            ))}
          </select>
          <button onClick={ this.handleAddExpense }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses.expenses,
  exchangeRates: state.wallet.expenses.exchangeRates,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  addExpense: (expense) => dispatch(actions.addExpense(expense)),
  fetchCurrencies: () => dispatch(actions.fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
