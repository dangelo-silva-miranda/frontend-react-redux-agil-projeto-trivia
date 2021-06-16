import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { fetchToken, saveNameEmailPlayer } from '../redux/actions/player';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      disabledButton: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyCompletedForm = this.verifyCompletedForm.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    },
    () => this.verifyCompletedForm());
  }

  verifyCompletedForm() {
    const { name, email } = this.state;
    const emailPattern = /^[a-z0-9._]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i;
    const minimalCharaterSize = 0;

    // const emailTest = RegExp(/^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/);
    // const verifyEmail = emailTest.test(event.target.value);

    if (emailPattern.test(email) && name.length > minimalCharaterSize) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  }

  handleClick(name, email) {
    const { getToken, saveNameEmail } = this.props;
    getToken();
    saveNameEmail(name, email);
  }

  render() {
    const { name, email, disabledButton } = this.state;

    return (
      <form>
        <label htmlFor="input-player-name">
          Nome:
          <input
            value={ name }
            type="text"
            name="name"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-gravatar-email">
          E-mail:
          <input
            value={ email }
            type="email"
            name="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ disabledButton }
            onClick={ () => this.handleClick(name, email) }
          >
            Jogar
          </button>
        </Link>
        <Link to="/config">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </form>
    );
  }
}

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
  saveNameEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  saveNameEmail: (name, email) => dispatch(saveNameEmailPlayer(name, email)),
});

export default connect(null, mapDispatchToProps)(Login);
