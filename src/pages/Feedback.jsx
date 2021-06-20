import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.msgFeedback = this.msgFeedback.bind(this);
    this.msgAssertions = this.msgAssertions.bind(this);
  }

  msgFeedback(assertions) {
    const param = 3;
    if (assertions < param) {
      return (
        <p data-testid="feedback-text">Podia ser melhor...</p>
      );
    }
    return (
      <p data-testid="feedback-text">Mandou bem!</p>
    );
  }

  msgAssertions(assertions) {
    const one = 1;
    if (assertions <= one) {
      switch (assertions) {
      case 1:
        return 'Acertou 1 pergunta';
      default:
        return 'Não acertou nenhuma pergunta';
      }
    } else {
      return `Acertou ${assertions} perguntas`;
    }
  }

  render() {
    const { score, assertions } = this.props;
    console.log(assertions);
    return (
      <div>
        <Header />
        <div>
          <p data-testid="feedback-total-score">{ score }</p>
          <p
            data-testid="feedback-total-question"
          >
            {assertions}
          </p>
          <p>
            {this.msgFeedback(assertions)}
          </p>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-play-again"
            >
              Jogar novamente
            </button>
          </Link>
          <Link to="/raking">
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

const mapStateToProps = ({ player: { score, assertions } }) => ({
  score,
  assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
