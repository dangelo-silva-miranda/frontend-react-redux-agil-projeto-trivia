import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { fetchToken, saveNameEmailPlayer } from '../redux/actions/player';
import { fetchQuestions } from '../redux/actions/game';

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

    if (emailPattern.test(email) && name.length > minimalCharaterSize) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  }

  async handleClick(name, email) {
    const { getToken, saveNameEmail, token, getQuestions, history } = this.props;
    await getToken();
    saveNameEmail(name, email);
    const questionsNumber = 5;
    await getQuestions(token, questionsNumber);
    const key = 'state';
    saveLocalStorage(key, { player: { name, score: 0 } });
    history.push('/game');
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
        <button
          type="button"
          data-testid="btn-play"
          disabled={ disabledButton }
          onClick={ () => this.handleClick(name, email) }
        >
          Jogar
        </button>
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
  token: PropTypes.string.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  getToken: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
  saveNameEmail: PropTypes.func.isRequired,
};

const mapStateToProps = ({ player: { token } }) => ({
  token,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  getQuestions: (token, questionsNumber) => dispatch(
    fetchQuestions(token, questionsNumber),
  ),
  saveNameEmail: (name, email) => dispatch(saveNameEmailPlayer(name, email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
