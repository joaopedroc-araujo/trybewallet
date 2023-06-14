import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.validateInputs);
  }

  handleClick = () => {
    const { dispatch } = this.props;
    const { email } = this.state;
    dispatch(addEmail(email));
  };

  validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  validateInputs = () => {
    const { email, password } = this.state;
    const MAX_LENGTH = 6;
    const isButtonDisabled = !(this.validateEmail(email)
    && password.length >= MAX_LENGTH);
    this.setState({ isButtonDisabled });
  };

  render() {
    const { isButtonDisabled, password, email } = this.state;
    return (
      <div>
        <h2>Login</h2>
        <form>
          <label>
            <input
              type="email"
              name="email"
              data-testid="email-input"
              placeholder="Digite seu e-mail"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              data-testid="password-input"
              placeholder="Digite sua senha"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/carteira">
            <button
              type="submit"
              disabled={ isButtonDisabled }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Login);
