import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeCurrency, fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    // console.log(fetchCurrencies());
    dispatch(fetchCurrencies());
  }

  handleChange = (event) => {
    const { dispatch } = this.props;
    const selectedCurrency = event.target.value;
    dispatch(changeCurrency(selectedCurrency));
  };

  render() {
    const { currencies, selectedCurrency } = this.props;
    const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    // console.log(currencies);
    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="Valor da despesa"
            data-testid="value-input"
          />
          <input
            type="text"
            placeholder="Descrição da despesa"
            data-testid="description-input"

          />
          <select
            data-testid="currency-input"
            value={ selectedCurrency }
            onChange={ this.handleChange }
          >
            {currencies.map((currency) => (
              <option key={ currency } value={ currency }>
                {currency}
              </option>
            ))}
          </select>
          <br />
          <select data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            {tagOptions.map((tagOption) => (
              <option key={ tagOption } value={ tagOption }>
                {tagOption}
              </option>
            ))}
          </select>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCurrency: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  selectedCurrency: state.wallet.selectedCurrency,
});

export default connect(mapStateToProps)(WalletForm);
