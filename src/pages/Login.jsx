import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { fetchToken, saveNameEmailPlayer } from '../redux/actions/player';
import { fetchQuestions, setQuestionsNumber } from '../redux/actions/game';
import { saveLocalStorage, toHash } from '../functions';
import { GRAVATAR_API } from '../services/api';

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
    const {
      getToken, saveNameEmail,
      token, getQuestions, history,
      questionsNumber, setQuestionsNum,
    } = this.props;

    await getToken();
    const hash = toHash(email);
    const picture = `${GRAVATAR_API}${hash}`;
    saveNameEmail(name, email, picture);
    setQuestionsNum(); // mover para config.jsx
    await getQuestions(token, questionsNumber);
    const keyy = 'state';
    saveLocalStorage(keyy, { player: { name, score: 0, gravatarEmail: email, picture } });
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
            Configura????es
          </button>
        </Link>
      </form>
    );
  }
}

Login.propTypes = {
  token: PropTypes.string.isRequired,
  questionsNumber: PropTypes.number.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  getToken: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
  saveNameEmail: PropTypes.func.isRequired,
  setQuestionsNum: PropTypes.func.isRequired,
};

const mapStateToProps = ({ player: { token }, game: { questionsNumber } }) => ({
  token,
  questionsNumber,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  getQuestions: (token, questionsNumber) => dispatch(
    fetchQuestions(token, questionsNumber),
  ),
  saveNameEmail: (name, email, picture) => dispatch(
    saveNameEmailPlayer(name, email, picture),
  ),
  setQuestionsNum: (questionsNumber) => dispatch(
    setQuestionsNumber(questionsNumber),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
