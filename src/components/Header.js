import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchChangeRates } from '../redux/actions';

class Header extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchChangeRates());
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <h3 data-testid="email-field">{email}</h3>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  // currentRate: state.wallet.exchangeRates.currentRate,
});

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
