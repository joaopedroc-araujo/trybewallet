import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletForm from './WalletForm';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <>
        <div>
          <h3 data-testid="email-field">{email}</h3>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
        <section>
          <WalletForm />
        </section>

      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.userReducer,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
