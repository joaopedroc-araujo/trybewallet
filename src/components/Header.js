import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { fetchChangeRates } from '../redux/actions';
// import { fetchCurrenciesAndRates } from '../redux/actions';

class Header extends Component {
  handleRate = () => {
    const { expenses, exchangeRates } = this.props;
    const total = expenses.reduce((acc, curr) => {
      const { currency, value } = curr;
      const rate = exchangeRates[currency] ? exchangeRates[currency].ask : 0;
      const totalValue = Number(value) * Number(rate);
      return acc + totalValue;
    }, 0).toFixed(2);

    console.log(total);
    return total;
  };

  render() {
    const { email } = this.props;
    const totalValue = this.handleRate();
    // const {exchangeRates} = this.props;
    // console.log(totalValue);
    return (
      <div>
        <h3 data-testid="email-field">{email}</h3>
        <p data-testid="total-field">{totalValue}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  exchangeRates: state.wallet.exchangeRates[0],
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      currency: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
  exchangeRates: PropTypes.shape({
    ask: PropTypes.number.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
