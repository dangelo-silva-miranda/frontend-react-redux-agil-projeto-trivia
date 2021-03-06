import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import { saveLocalStorage } from '../functions';
import { clearHistoryGame } from '../redux/actions/player';
import { newAnswers } from '../redux/actions/game';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.msgFeedback = this.msgFeedback.bind(this);
    this.clearHistoryGame = this.clearHistoryGame.bind(this);
    this.saveLS = this.saveLS.bind(this);
  }

  componentDidMount() {
    this.saveLS();
  }

  saveLS() {
    const { name, gravatarEmail, assertions, score } = this.props;
    const currState = {
      player: {
        name,
        gravatarEmail,
        assertions,
        score,
      },
    };
    const key = 'state';
    saveLocalStorage(key, currState);
  }

  clearHistoryGame() {
    const { clearHistoryGame: clearHistory, newAnswers: uptAnswers } = this.props;
    clearHistory();
    const newScore = {
      player: {
        name: '',
        gravatarEmail: '',
        assertions: 0,
        score: 0,
      },
    };
    const key = 'state';
    saveLocalStorage(key, newScore);
    uptAnswers(true);
  }

  msgFeedback(assertions) {
    const { questionsNumber } = this.props;
    const APPROVAL_PERCENTAGE = 0.60;
    const questionsAverageToApprove = APPROVAL_PERCENTAGE * questionsNumber;
    if (assertions < questionsAverageToApprove) {
      return (
        <p data-testid="feedback-text">Podia ser melhor...</p>
      );
    }
    return (
      <p data-testid="feedback-text">Mandou bem!</p>
    );
  }

  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        <div>
          <p>
            Placar final:
            {' '}
            <span data-testid="feedback-total-score">{ score }</span>
          </p>
          <p>
            Você acertou:
            {' '}
            <span
              data-testid="feedback-total-question"
            >
              {assertions}
            </span>
            {' '}
            {(assertions <= 1) ? 'pergunta' : 'perguntas'}
          </p>
          <p>
            {this.msgFeedback(assertions)}
          </p>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-play-again"
              onClick={ this.clearHistoryGame }
            >
              Jogar novamente
            </button>
          </Link>
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
            >
              Ranking
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  questionsNumber: PropTypes.number.isRequired,
  clearHistoryGame: PropTypes.func.isRequired,
  newAnswers: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  player: { name, gravatarEmail, score, assertions }, game: { questionsNumber } }) => ({
  name,
  gravatarEmail,
  score,
  assertions,
  questionsNumber,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ clearHistoryGame, newAnswers }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
