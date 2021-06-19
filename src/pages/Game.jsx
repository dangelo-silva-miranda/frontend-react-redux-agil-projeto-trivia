import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import './css/Game.css';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { saveLocalStorage } from '../functions';
import { addScore } from '../redux/actions/player';

class Trivia extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 30,
      stopTime: false,
      indexQuestion: 0,
      chosenAnswer: false,
      disabledButton: false,
    };
    this.timer = this.timer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.calcPointsScore = this.calcPointsScore.bind(this);
    this.buttonNext = this.buttonNext.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  componentDidUpdate() {
    this.stopTimer();
  }

  stopTimer() {
    const { time, stopTime, disabledButton } = this.state;
    if ((time === 0 || stopTime === true) && !disabledButton) {
      clearInterval(this.time);
      this.setState({ disabledButton: true });
    }
  }

  timer() {
    const ONE_SEC = 1000;
    this.time = setInterval(() => {
      this.setState((prevState) => ({ time: prevState.time - 1 }));
    }, ONE_SEC);
  }

  nextQuestion() {
    const { indexQuestion } = this.state;
    this.setState({ indexQuestion: indexQuestion + 1 });
  }

  buttonNext() {
    const { chosenAnswer } = this.state;
    if (chosenAnswer) {
      return (
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.nextQuestion }
        >
          Próxima Pergunta
        </button>
      );
    }
  }

  calcPointsScore({ target: { innerText } }) {
    const { state: { time, indexQuestion }, props: { questions } } = this;
    const questionSelected = questions[indexQuestion];
    const { correct_answer: correctAnswer, difficulty } = questionSelected;
    const answer = innerText;
    const level = { easy: 1, medium: 2, hard: 3 };
    const INITIAL_VALUE = 10;

    if (answer === correctAnswer) {
      const { easy, medium, hard } = level;
      switch (difficulty) {
      case 'easy':
        return (INITIAL_VALUE + (time * easy));
      case 'medium':
        return (INITIAL_VALUE + (time * medium));
      case 'hard':
        return (INITIAL_VALUE + (time * hard));
      default:
        return '';
      }
    }
  }

  handleClick(event) {
    const {
      props: { addScore: addToScore, score, name, gravatarEmail,
      } } = this;

    this.setState({
      stopTime: true,
      chosenAnswer: true,
    });
    const scorePage = this.calcPointsScore(event);
    if (scorePage) {
      const currScore = score + scorePage;
      const newScore = {
        player: {
          name,
          gravatarEmail,
          score: currScore,
        },
      };
      const key = 'state';
      saveLocalStorage(key, newScore);
      addToScore(currScore);
    }
  }

  render() {
    const {
      time, indexQuestion, chosenAnswer, disabledButton,
    } = this.state;
    return (
      <div>
        <Header />
        <Questions
          handleClick={ this.handleClick }
          indexQuestion={ indexQuestion }
          chosenAnswer={ chosenAnswer }
          disabledButton={ disabledButton }
        />
        <h5>{`Tempo: ${time}`}</h5>
        { this.buttonNext() }
      </div>
    );
  }
}

Trivia.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  addScore: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  game: { questions },
  player: { name, gravatarEmail, score },
}) => ({

  questions,
  name,
  gravatarEmail,
  score,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ addScore }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
